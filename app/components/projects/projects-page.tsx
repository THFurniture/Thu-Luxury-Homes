import { useSearchParams } from "react-router";

import type { Project } from "../../data/projects";
import { ProjectGalleryOverlay } from "./project-gallery";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsHero } from "./projects-hero";
import { preloadProjectImages } from "./projects-utils";

type ProjectsPageProps = {
  projects: Project[];
};

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get("project");
  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? null;

  const openProject = (project: Project) => {
    preloadProjectImages(project);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("project", project.slug);
    setSearchParams(nextSearchParams, { preventScrollReset: true });
  };

  const closeProject = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("project");
    setSearchParams(nextSearchParams, {
      preventScrollReset: true,
      replace: true,
    });
  };

  return (
    <main id="top" className="bg-[#080808] text-white">
      <ProjectsHero />
      <ProjectsGrid projects={projects} onOpenProject={openProject} />
      <ProjectGalleryOverlay project={activeProject} onClose={closeProject} />
    </main>
  );
}
