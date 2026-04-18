export type ContactFieldName =
  | "name"
  | "email"
  | "phone"
  | "propertyAddress"
  | "message";

type ContactSubmission = Record<ContactFieldName, string>;

export interface ContactFormActionData {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
}

function getTrimmedString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateContactSubmission(
  submission: ContactSubmission,
): Partial<Record<ContactFieldName, string>> {
  const fieldErrors: Partial<Record<ContactFieldName, string>> = {};

  if (!submission.name || submission.name.length < 2) {
    fieldErrors.name = "Please enter your name.";
  }

  if (!submission.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (submission.phone && submission.phone.length > 40) {
    fieldErrors.phone = "Phone number is too long.";
  }

  if (submission.propertyAddress && submission.propertyAddress.length > 140) {
    fieldErrors.propertyAddress = "Property address is too long.";
  }

  if (!submission.message || submission.message.length < 10) {
    fieldErrors.message = "Please include a short project description.";
  } else if (submission.message.length > 4000) {
    fieldErrors.message = "Message is too long.";
  }

  return fieldErrors;
}

export async function handleContactFormAction(request: Request) {
  const formData = await request.formData();

  if (getTrimmedString(formData, "company")) {
    return Response.json({
      ok: true,
      message: "Thanks. Your inquiry was received.",
    });
  }

  const submission: ContactSubmission = {
    name: getTrimmedString(formData, "name"),
    email: getTrimmedString(formData, "email"),
    phone: getTrimmedString(formData, "phone"),
    propertyAddress: getTrimmedString(formData, "propertyAddress"),
    message: getTrimmedString(formData, "message"),
  };

  const fieldErrors = validateContactSubmission(submission);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!contactToEmail || !contactFromEmail) {
    console.error(
      "Missing contact email configuration. Set CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );

    return Response.json(
      {
        ok: false,
        message: "The contact form is not configured yet. Please try again later.",
      },
      { status: 500 },
    );
  }

  try {
    const [{ renderContactInquiryEmail, renderContactInquiryText }, { getResendClient }] =
      await Promise.all([
        import("./contact-email.server"),
        import("./resend.server"),
      ]);

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: submission.email,
      subject: `New website inquiry from ${submission.name}`,
      html: renderContactInquiryEmail(submission),
      text: renderContactInquiryText(submission),
    });

    if (error) {
      console.error("Resend error sending contact inquiry", error);

      return Response.json(
        {
          ok: false,
          message: "We couldn't send your inquiry right now. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      ok: true,
      message: "Thanks. We received your inquiry and will reply within one business day.",
    });
  } catch (error) {
    console.error("Unexpected error sending contact inquiry", error);

    return Response.json(
      {
        ok: false,
        message: "We couldn't send your inquiry right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
