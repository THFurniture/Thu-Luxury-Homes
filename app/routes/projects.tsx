import { projects } from "../data/projects";
import { ProjectsPage } from "../components/projects/projects-page";
import { SitePage } from "../components/site/site-page";
import { buildPageMeta, getMetaOrigin } from "../lib/seo";
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

export function meta({ matches, location }: Route.MetaArgs) {
  const searchParams = new URLSearchParams(location.search);
  const selectedProject = projects.find(
    (project) => project.slug === searchParams.get("project"),
  );
  const title = selectedProject
    ? `${selectedProject.name} | Thu Luxury Homes Projects`
    : "Projects | Thu Luxury Homes";
  const description = selectedProject
    ? `${selectedProject.type} project in ${selectedProject.location} by Thu Luxury Homes.`
    : "Browse Thu Luxury Homes' visual archive of staged homes and interior projects across Greater Vancouver.";
  const imageSlug = selectedProject?.slug ?? "w26-residence";

  return buildPageMeta({
    title,
    description,
    origin: getMetaOrigin(matches),
    pathname: `${location.pathname}${location.search}`,
    imagePath: `/og/${imageSlug}-og.jpg`,
    imageAlt: selectedProject
      ? `${selectedProject.name} staged interior by Thu Luxury Homes`
      : "Thu Luxury Homes staged interior project",
  });
}

export default function ProjectsRoute() {
  return (
    <SitePage>
      <ProjectsPage projects={portfolioProjects} />
    </SitePage>
  );
}
