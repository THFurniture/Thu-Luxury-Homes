import { HomePage } from "../components/home/home-page";
import { SitePage } from "../components/site/site-page";
import { handleContactFormAction } from "../lib/contact-form.server";
import { buildPageMeta, getMetaOrigin } from "../lib/seo";
import type { Route } from "./+types/home";

export function meta({ matches, location }: Route.MetaArgs) {
  return buildPageMeta({
    title: "Thu Luxury Homes | Vancouver Home Staging",
    description:
      "Thu Luxury Homes provides premium home staging and interior design services across Greater Vancouver, BC.",
    origin: getMetaOrigin(matches),
    pathname: location.pathname,
    imagePath: "/og/w26-residence-og.jpg",
    imageAlt: "Luxury staged home interior by Thu Luxury Homes",
  });
}

export async function action({ request }: Route.ActionArgs) {
  return handleContactFormAction(request);
}

export default function Home() {
  return (
    <SitePage>
      <HomePage />
    </SitePage>
  );
}
