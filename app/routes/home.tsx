import { useRef } from "react";

import { AboutSection } from "../components/home/about-section";
import { ContactSection } from "../components/home/contact-section";
import { HeroSection } from "../components/home/hero-section";
import { PortfolioSection } from "../components/home/portfolio-section";
import { ServicesSection } from "../components/home/services-section";
import { SiteFooter } from "../components/home/site-footer";
import { SiteHeader } from "../components/home/site-header";
import { useHomeAnimations } from "../components/home/use-home-animations";
import { handleContactFormAction } from "../lib/contact-form.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The One Home Staging | Vancouver Home Staging" },
    {
      name: "description",
      content:
        "The One Home Staging provides premium home staging and interior design services across Greater Vancouver, BC.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return handleContactFormAction(request);
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const isSiteReady = true;

  useHomeAnimations(pageRef, isSiteReady);

  return (
    <div ref={pageRef} className="relative overflow-x-clip">
      <SiteHeader />

      <main id="top">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
