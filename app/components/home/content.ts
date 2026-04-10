export type HeroImage = {
  src: string;
  alt: string;
};

export type PortfolioProject = {
  images: string[];
  name: string;
  type: string;
  location: string;
  image: string;
};

export const heroImages: HeroImage[] = [
  {
    src: "/projects-imgs/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-1.avif",
    alt: "Staged Vancouver bedroom with layered neutrals and a city-facing luxury finish",
  },
  {
    src: "/projects-imgs/alberni_st_1568/alberni-st-1568-4001-vancouver-3.avif",
    alt: "Curated luxury condo interior staged in downtown Vancouver",
  },
  {
    src: "/projects-imgs/alberni_st_1568/alberni-st-1568-4001-vancouver-5.avif",
    alt: "Bright staged residential interior with warm textures and layered furniture",
  },
];

export const preloaderImages: HeroImage[] = [
  {
    src: "/projects-imgs/alberni_st_1568/alberni-st-1568-4001-vancouver-5.avif",
    alt: "Staged downtown Vancouver interior with dramatic contrast and layered furnishings",
  },
  {
    src: "/projects-imgs/27th_ave_13560/27th-ave-13560-surrey-3.avif",
    alt: "Luxury condo staging with polished finishes and warm natural light",
  },
  {
    src: "/projects-imgs/w_georgia_st_1128/w-georgia-st-1128-4903-vancouver-2.avif",
    alt: "Staged Vancouver bedroom with layered neutrals and a city-facing luxury finish",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "W26 Residence",
    type: "Luxury residential staging",
    location: "Vancouver",
    image: "/projects-imgs/w26_residence/w26-residence-4.avif",
    images: [
      "/projects-imgs/w26_residence/w26-residence-2.avif",
      "/projects-imgs/w26_residence/w26-residence-4.avif",
      "/projects-imgs/w26_residence/w26-residence-6.avif",
      "/projects-imgs/w26_residence/w26-residence-8.avif",
    ],
  },
  {
    name: "Crestline Rd 1095",
    type: "West Vancouver staging",
    location: "West Vancouver",
    image: "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-3.avif",
    images: [
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-1.avif",
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-3.avif",
      "/projects-imgs/crestline_rd_1095/crestline-rd-1095-west-vancouver-5.avif",
    ],
  },
  {
    name: "Mathers Ave 2495",
    type: "Occupied home refresh",
    location: "West Vancouver",
    image: "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif",
    images: [
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-2.avif",
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-5.avif",
      "/projects-imgs/mathers_ave_2495/mathers-ave-2495-west-vancouver-7.avif",
    ],
  },
  {
    name: "Balfour Ave 1263",
    type: "Family home staging",
    location: "Vancouver",
    image: "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-4.avif",
    images: [
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-2.avif",
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-4.avif",
      "/projects-imgs/balfour_ave_1263/balfour-ave-1263-vancouver-7.avif",
    ],
  },
];

export const serviceAreas = [
  "Vancouver",
  "West Van",
  "North Van",
  "Burnaby",
  "Richmond",
  "Coquitlam",
];

export const mutedText = "text-[rgba(229,229,229,0.78)]";
export const eyebrow =
  "m-0 text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.62)]";
export const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em] text-[#f5f5f5]';
export const glassPanel =
  "rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-[14px]";
