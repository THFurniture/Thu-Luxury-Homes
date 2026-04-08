import { startTransition, useRef, useState } from "react";

import { AboutSection } from "../components/home/about-section";
import { ClientOnly } from "../components/client-only";
import { ContactSection } from "../components/home/contact-section";
import { preloaderImages } from "../components/home/content";
import { HeroSection } from "../components/home/hero-section";
import LayoutPreloader from "../components/layout-preloader";
import { PortfolioSection } from "../components/home/portfolio-section";
import { ServicesSection } from "../components/home/services-section";
import { SiteHeader } from "../components/home/site-header";
import { useHomeAnimations } from "../components/home/use-home-animations";
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

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [isSiteReady, setIsSiteReady] = useState(false);

  useHomeAnimations(pageRef, isSiteReady);

  return (
    <>
      <ClientOnly>
        <LayoutPreloader
          images={preloaderImages}
          onComplete={() => {
            startTransition(() => setIsSiteReady(true));
          }}
        />
      </ClientOnly>

      <div ref={pageRef} className="relative overflow-x-clip">
        <SiteHeader />

        <main id="top">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
