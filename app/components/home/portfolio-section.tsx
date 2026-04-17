import ImageReveal from "../image-reveal";
import { SectionIntro } from "./section-intro";

const portfolioProjects = [
  {
    images: [
      "/projects-imgs/w26_residence/w26-residence-2.avif",
      "/projects-imgs/w26_residence/w26-residence-4.avif",
      "/projects-imgs/w26_residence/w26-residence-6.avif",
      "/projects-imgs/w26_residence/w26-residence-8.avif",
    ],
    image: "/projects-imgs/w26_residence/w26-residence-4.avif",
    location: "Vancouver",
    name: "W26 Residence",
    type: "Luxury residential staging",
  },
  {
    images: [
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-1.avif",
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-3.avif",
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-5.avif",
    ],
    image: "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-3.avif",
    location: "West Vancouver",
    name: "Crestline Rd 1095",
    type: "West Vancouver staging",
  },
  {
    images: [
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-2.avif",
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif",
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-7.avif",
    ],
    image: "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif",
    location: "West Vancouver",
    name: "Mathers Ave 2495",
    type: "West Vancouver Staging",
  },
  {
    images: [
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-2.avif",
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-4.avif",
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-7.avif",
    ],
    image: "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-4.avif",
    location: "Vancouver",
    name: "Balfour Ave 1263",
    type: "Family home staging",
  },
];

export function PortfolioSection() {
  const portfolioSurface = "bg-[#080808]";

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
