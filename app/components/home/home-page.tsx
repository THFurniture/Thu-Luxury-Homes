import { AboutSection } from "./about-section";
import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { PortfolioSection } from "./portfolio-section";
import { YoutubeCtaSection } from "./youtube-cta-section";

export function HomePage() {
  return (
    <main id="top">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <YoutubeCtaSection />
      <ContactSection />
    </main>
  );
}
