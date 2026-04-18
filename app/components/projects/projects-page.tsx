import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { Project } from "../../data/projects";

type ProjectsPageProps = {
  projects: Project[];
};

const serifDisplay =
  'font-["Cormorant_Garamond",Georgia,serif] font-medium tracking-[-0.03em]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const tileSizes = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-5",
  "md:col-span-7",
];
const tileHeights = [
  "h-[32rem]",
  "h-[32rem]",
  "h-[26rem]",
  "h-[26rem]",
  "h-[26rem]",
  "h-[30rem]",
  "h-[30rem]",
  "h-[32rem]",
  "h-[32rem]",
];

function clampImageIndex(project: Project, imageIndex: number) {
  if (project.images.length === 0) return 0;
  return (imageIndex + project.images.length) % project.images.length;
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeSlug) ?? null,
    [activeSlug, projects],
  );
  const activeImage = activeProject?.images[activeImageIndex] ?? null;

  const openProject = (project: Project) => {
    setActiveSlug(project.slug);
    setActiveImageIndex(0);
  };

  const closeProject = () => {
    setActiveSlug(null);
    setActiveImageIndex(0);
  };

  const showPreviousImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((current) => clampImageIndex(activeProject, current - 1));
  };

  const showNextImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((current) => clampImageIndex(activeProject, current + 1));
  };

  useEffect(() => {
    if (!activeProject || typeof window === "undefined") return;

    for (const src of activeProject.images) {
      const image = new window.Image();
      image.src = src;
    }
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject || typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject || typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <main id="top" className="bg-[#080808] text-white">
      <section className="relative min-h-[94svh] overflow-hidden pt-[7rem] max-[820px]:pt-[6.4rem]">
        <img
          src="/projects-imgs/w26_residence/w26-residence-4.avif"
          alt="Featured staged Vancouver residence"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.5)_44%,rgba(0,0,0,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.06)_46%,#080808_100%)]" />

        <div className="relative z-[1] mx-auto grid min-h-[calc(94svh-7rem)] max-w-[90rem] items-center px-5 py-14 max-[560px]:px-4">
          <m.div
            className="max-w-[60rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-white/72">
              Projects
            </p>
            <h1
              className={`${serifDisplay} mt-5 text-[clamp(3.4rem,7.2vw,7rem)] leading-[0.88] text-white max-[560px]:text-[clamp(2.5rem,14vw,4rem)]`}
            >
              A visual archive of staged homes across Greater Vancouver.
            </h1>
            <p className="mt-7 max-w-[36rem] text-[1rem] leading-[1.75] text-white/82">
              Browse selected properties, then open any project to move through
              its full image set.
            </p>
          </m.div>
        </div>
      </section>

      <section className="px-5 py-24 max-[560px]:px-4 max-[560px]:py-16">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-12 flex items-end justify-between gap-8 max-[780px]:flex-col max-[780px]:items-start">
            <div>
              <p className="text-[0.74rem] font-extrabold uppercase tracking-[0.22em] text-white/42">
                Selected work
              </p>
              <h2 className={`${serifDisplay} mt-4 text-[clamp(2.6rem,5vw,5.2rem)] leading-[0.92]`}>
                {projects.length} projects, image first.
              </h2>
            </div>
            <p className="max-w-[25rem] text-[0.95rem] leading-[1.75] text-white/62">
              Each cover opens a focused project viewer with the full gallery,
              controls, and quick thumbnails.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            {projects.map((project, index) => {
              const tileSize = tileSizes[index % tileSizes.length];
              const tileHeight = tileHeights[index % tileHeights.length];

              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => openProject(project)}
                  className={`group relative col-span-1 overflow-hidden border border-white/10 bg-[#111111] text-left ${tileSize} ${tileHeight} max-[760px]:h-[24rem] max-[560px]:h-[20rem]`}
                >
                  <img
                    src={project.coverImage}
                    alt={`${project.name} staged interior`}
                    className="absolute inset-0 h-full w-full scale-[1.02] object-cover transition duration-700 group-hover:scale-[1.07]"
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding={index < 3 ? "sync" : "async"}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.74)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 max-[560px]:p-4">
                    <div>
                      <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/66">
                        {project.location}
                      </span>
                      <h3 className={`${serifDisplay} mt-2 text-[clamp(2rem,3.4vw,3.6rem)] leading-[0.9] text-white`}>
                        {project.name}
                      </h3>
                      <p className="mt-3 text-[0.78rem] font-extrabold uppercase tracking-[0.17em] text-white/68">
                        {project.type}
                      </p>
                    </div>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/24 bg-white/12 text-white backdrop-blur-[10px]">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                        <path d="M4 8.5h9M9.5 5l3.5 3.5L9.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && activeImage ? (
          <m.div
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.92)] text-white backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} project gallery`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 max-[560px]:px-4">
                <div>
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/44">
                    {activeProject.location}
                  </p>
                  <h2 className={`${serifDisplay} mt-1 text-[clamp(1.9rem,3vw,3.3rem)] leading-[0.92]`}>
                    {activeProject.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeProject}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition duration-200 hover:bg-white/16"
                  aria-label="Close project gallery"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="relative min-h-0">
                <AnimatePresence mode="wait" initial={false}>
                  <m.img
                    key={activeImage}
                    src={activeImage}
                    alt={`${activeProject.name} image ${activeImageIndex + 1}`}
                    className="absolute inset-0 h-full w-full object-contain"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: easeOutExpo }}
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-5 max-[560px]:p-3">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-black/42 text-white backdrop-blur-[10px] transition duration-200 hover:bg-white/12"
                    aria-label="Previous image"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M11 4.5L6.5 9l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-5 max-[560px]:p-3">
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-black/42 text-white backdrop-blur-[10px] transition duration-200 hover:bg-white/12"
                    aria-label="Next image"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M7 4.5L11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/14 bg-black/44 px-4 py-2 text-[0.74rem] font-extrabold uppercase tracking-[0.2em] text-white/82 backdrop-blur-[10px]">
                  {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeProject.images.length).padStart(2, "0")}
                </div>
              </div>

              <div className="border-t border-white/10 px-5 py-4 max-[560px]:px-4">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {activeProject.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden border transition duration-200 ${
                        activeImageIndex === index
                          ? "border-white"
                          : "border-white/14 opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
