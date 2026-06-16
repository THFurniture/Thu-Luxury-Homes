import { projects } from "../data/projects";
import { ProjectsPage } from "../components/projects/projects-page";
import { SitePage } from "../components/site/site-page";
import type { Route } from "./+types/projects";

const portfolioSlugs = [
  "cambie-st-885",
  "claysmith-rd-8128",
  "w-georgia-st-1128",
  "robson-st-1408",
  "trumond-ave-3428",
  "quayside-dr-680",
  "finn-rd-8731",
  "sandhurst-pl-1416",
];

const portfolioProjects = portfolioSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Thu Luxury Homes" },
    {
      name: "description",
      content:
        "Browse Thu Luxury Homes' visual archive of staged homes and interior projects across Greater Vancouver.",
    },
  ];
}

export default function ProjectsRoute() {
  return (
    <SitePage>
      <ProjectsPage projects={portfolioProjects} />
    </SitePage>
  );
}
