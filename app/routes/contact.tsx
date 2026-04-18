import { ContactPage } from "../components/contact/contact-page";
import { SitePage } from "../components/site/site-page";
import { handleContactFormAction } from "../lib/contact-form.server";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | The One Home Staging" },
    {
      name: "description",
      content:
        "Contact The One Home Staging for home staging and interior design inquiries across Greater Vancouver.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleContactFormAction(request);
}

export default function ContactRoute() {
  return (
    <SitePage>
      <ContactPage />
    </SitePage>
  );
}
