import { AboutPage } from "../components/about/about-page";
import { SitePage } from "../components/site/site-page";
import { buildPageMeta, getMetaOrigin } from "../lib/seo";
import type { Route } from "./+types/about-us";

export function meta({ matches, location }: Route.MetaArgs) {
  return buildPageMeta({
    title: "About Us | Thu Luxury Homes",
    description:
      "Learn about Thu Luxury Homes, a Vancouver home staging and interior design firm serving Greater Vancouver.",
    origin: getMetaOrigin(matches),
    pathname: location.pathname,
    imagePath: "/og/w-georgia-st-1128-og.jpg",
    imageAlt: "Thu Luxury Homes staged condo interior in Vancouver",
  });
}

export default function AboutUsRoute() {
  return (
    <SitePage>
      <AboutPage />
    </SitePage>
  );
}

