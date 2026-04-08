import ImageReveal from "../image-reveal";
import {
  portfolioProjects,
  mutedText,
} from "./content";
import { SectionIntro } from "./section-intro";

export function PortfolioSection() {
  const portfolioSurface = "bg-[#efe3d5]";

  const revealItems = portfolioProjects.map((project, index) => ({
    images: project.images,
    image: project.image,
    location: project.location,
    number: `${index + 1}`.padStart(2, "0"),
    title: project.name,
    type: project.type,
  }));

  return (
    <section
      id="portfolio"
      className={`section portfolio-section portfolio-shell ${portfolioSurface} px-5 pt-32 pb-24 max-[560px]:px-4 max-[560px]:pb-20`}
      data-section
    >
      <div className={`relative left-1/2 w-screen -translate-x-1/2 ${portfolioSurface}`}>
        <div className="mx-auto max-w-[90rem] px-5 max-[560px]:px-4">
          <SectionIntro
            tag="Our work"
            title="Selected projects"
            className="portfolio-intro max-w-[42rem] grid-cols-1 gap-8 [&_.section-copy]:leading-[1.02]"
          />
        </div>
      </div>

      <div className="relative z-10 mt-12 max-[560px]:mt-8">
        <ImageReveal items={revealItems} />
      </div>
    </section>
  );
}
