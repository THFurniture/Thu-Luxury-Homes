import { AboutPage } from "../components/about/about-page";
import { SitePage } from "../components/site/site-page";
import type { Route } from "./+types/about-us";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | The One Home Staging" },
    {
      name: "description",
      content:
        "Learn about The One Home Staging, a Vancouver home staging and interior design firm serving Greater Vancouver.",
    },
  ];
}

export default function AboutUsRoute() {
  return (
    <SitePage>
      <AboutPage />
    </SitePage>
  );
}
