import type { Project } from "../../data/projects";
import { projectsSerifDisplay } from "./projects-styles";
import { stripStreetNumber } from "./projects-utils";

type ProjectsGridProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function ProjectsGrid({
  projects,
  onOpenProject,
}: ProjectsGridProps) {
  return (
    <section className="px-5 py-24 max-[560px]:px-4 max-[560px]:py-16">
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-12 flex items-end justify-between gap-8 max-[780px]:flex-col max-[780px]:items-start">
          <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.22em] text-white/42">
            Selected work
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => onOpenProject(project)}
              className="group relative aspect-square overflow-hidden border border-white/10 bg-[#111111] text-left"
            >
              <img
                src={project.coverImage}
                alt={`${stripStreetNumber(project.name)} staged interior`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/68 opacity-0 transition duration-500 group-hover:opacity-100 max-[820px]:bg-transparent max-[820px]:bg-gradient-to-t max-[820px]:from-black/35 max-[820px]:via-black/5 max-[820px]:to-transparent max-[820px]:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center p-5 text-center opacity-0 transition duration-500 group-hover:opacity-100 max-[820px]:items-end max-[820px]:p-4 max-[820px]:opacity-100">
                <div className="max-w-[18rem]">
                  <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/66">
                    {project.location}
                  </span>
                  <h3
                    className={`${projectsSerifDisplay} mt-2 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[0.95] text-white`}
                  >
                    {stripStreetNumber(project.name)}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
