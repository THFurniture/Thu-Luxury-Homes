import { ContactPage } from "../components/contact/contact-page";
import { SitePage } from "../components/site/site-page";
import { handleContactFormAction } from "../lib/contact-form.server";
import { buildPageMeta, getMetaOrigin } from "../lib/seo";
import type { Route } from "./+types/contact";

export function meta({ matches, location }: Route.MetaArgs) {
  return buildPageMeta({
    title: "Contact | Thu Luxury Homes",
    description:
      "Contact Thu Luxury Homes for home staging and interior design inquiries across Greater Vancouver.",
    origin: getMetaOrigin(matches),
    pathname: location.pathname,
    imagePath: "/og/balfour-ave-1263-og.jpg",
    imageAlt: "Home staging project by Thu Luxury Homes",
  });
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
