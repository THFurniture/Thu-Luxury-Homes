interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptional(label: string, value: string) {
  return value ? value : `Not provided (${label})`;
}

export function renderContactInquiryEmail({
  name,
  email,
  phone,
  propertyAddress,
  message,
}: ContactInquiry) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(formatOptional("phone", phone));
  const safePropertyAddress = escapeHtml(
    formatOptional("property address", propertyAddress),
  );
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `
    <div style="background:#f3f0ea;padding:32px;font-family:Arial,sans-serif;color:#111111;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(17,17,17,0.08);">
        <div style="padding:28px 28px 20px;border-bottom:1px solid rgba(17,17,17,0.08);background:#111111;color:#f5f5f5;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.72;">
            New inquiry
          </p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:600;">
            The One Home Staging
          </h1>
        </div>
        <div style="padding:28px;">
          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">
            A new contact form submission was received from the website.
          </p>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);font-weight:700;width:180px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);font-weight:700;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);font-weight:700;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);font-weight:700;">Property address</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.08);">${safePropertyAddress}</td>
              </tr>
              <tr>
                <td style="padding:10px 0 0;font-weight:700;vertical-align:top;">Message</td>
                <td style="padding:10px 0 0;line-height:1.7;">${safeMessage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function renderContactInquiryText({
  name,
  email,
  phone,
  propertyAddress,
  message,
}: ContactInquiry) {
  return [
    "New inquiry from the website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${formatOptional("phone", phone)}`,
    `Property address: ${formatOptional("property address", propertyAddress)}`,
    "",
    "Message:",
    message,
  ].join("\n");
}
