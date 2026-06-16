import { projects } from "../../data/projects";
import ImageReveal from "../image-reveal";
import { SectionIntro } from "./section-intro";

const portfolioSlugs = [
  "cambie-st-885",
  "claysmith-rd-8128",
  "w-georgia-st-1128",
  "robson-st-1408",
];

const portfolioProjects = portfolioSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function PortfolioSection() {
  const portfolioSurface = "bg-[#080808]";

  const revealItems = portfolioProjects.map((project, index) => ({
    images: project.images,
    image: project.coverImage,
    location: project.location,
    number: `${index + 1}`.padStart(2, "0"),
    title: project.name,
    href: `/projects?project=${project.slug}`,
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
            className="portfolio-intro max-w-[42rem] grid-cols-1 gap-4 [&_.section-copy]:text-left [&_.section-copy]:leading-[1.02]"
          />
        </div>
      </div>

      <div className="relative z-10 mt-12 max-[560px]:mt-8">
        <ImageReveal items={revealItems} />
      </div>
    </section>
  );
}
