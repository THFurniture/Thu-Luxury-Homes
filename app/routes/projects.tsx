import { projects } from "../data/projects";
import { ProjectsPage } from "../components/projects/projects-page";
import { SitePage } from "../components/site/site-page";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | The One Home Staging" },
    {
      name: "description",
      content:
        "Browse The One Home Staging's visual archive of staged homes and interior projects across Greater Vancouver.",
    },
  ];
}

export default function ProjectsRoute() {
  return (
    <SitePage>
      <ProjectsPage projects={projects} />
    </SitePage>
  );
}
