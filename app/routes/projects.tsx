import { shownProjects } from "../data/projects";
import { ProjectsPage } from "../components/projects/projects-page";
import { SitePage } from "../components/site/site-page";
import { buildPageMeta, getMetaOrigin } from "../lib/seo";
import type { Route } from "./+types/projects";

export function meta({ matches, location }: Route.MetaArgs) {
  const searchParams = new URLSearchParams(location.search);
  const selectedProject = shownProjects.find(
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
      <ProjectsPage projects={shownProjects} />
    </SitePage>
  );
}
