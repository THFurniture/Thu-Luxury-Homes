import { AboutHero } from "./about-hero";
import { AboutLegacySection } from "./about-legacy-section";

export function AboutPage() {
  return (
    <main id="top" className="bg-[#080808] text-white">
      <AboutHero />
      <AboutLegacySection />
    </main>
  );
}
