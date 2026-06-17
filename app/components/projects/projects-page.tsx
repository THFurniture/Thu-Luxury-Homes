import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import type { Project } from "../../data/projects";

type ProjectsPageProps = {
  projects: Project[];
};

const serifDisplay =
  'font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin tracking-[-0.03em]';
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function clampImageIndex(project: Project, imageIndex: number) {
  if (project.images.length === 0) return 0;
  return (imageIndex + project.images.length) % project.images.length;
}

function preloadProjectImages(project: Project) {
  if (typeof window === "undefined") return;

  for (const src of project.images) {
    const image = new window.Image();
    image.src = src;
  }
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSlug = searchParams.get("project");
  const [activeSlug, setActiveSlug] = useState<string | null>(
    initialSlug && projects.some((project) => project.slug === initialSlug)
      ? initialSlug
      : null,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const slugParam = searchParams.get("project");
    if (slugParam && slugParam !== activeSlug) {
      const exists = projects.some((project) => project.slug === slugParam);
      if (exists) {
        setActiveSlug(slugParam);
        setActiveImageIndex(0);
      }
    }
  }, [searchParams, projects, activeSlug]);

  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? null;
  const activeImage = activeProject?.images[activeImageIndex] ?? null;

  const openProject = (project: Project) => {
    preloadProjectImages(project);
    setActiveSlug(project.slug);
    setActiveImageIndex(0);
  };

  const closeProject = () => {
    setActiveSlug(null);
    setActiveImageIndex(0);
    if (searchParams.has("project")) {
      const next = new URLSearchParams(searchParams);
      next.delete("project");
      setSearchParams(next, { replace: true });
    }
  };

  const showPreviousImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((current) => clampImageIndex(activeProject, current - 1));
  };

  const showNextImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((current) => clampImageIndex(activeProject, current + 1));
  };

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) showNextImage();
    else showPreviousImage();
  };

  // Synchronizes the modal with the document scroll state while it is open.
  useEffect(() => {
    if (
      !activeProject ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    ) {
      return;
    }

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [activeProject]);

  // Synchronizes the modal with global keyboard shortcuts while it is open.
  useEffect(() => {
    if (!activeProject || typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSlug(null);
        setActiveImageIndex(0);
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          clampImageIndex(activeProject, current - 1),
        );
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          clampImageIndex(activeProject, current + 1),
        );
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
            className="max-w-[44rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-white/72">
              Projects
            </p>
            <h1
              className={`${serifDisplay} mt-5 text-[clamp(3.2rem,4.3vw,5.2rem)] leading-[0.9] text-white max-[560px]:text-[clamp(2.5rem,12vw,3.6rem)]`}
            >
              A visual archive of staged homes across Greater Vancouver.
            </h1>
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
            </div>
            
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => openProject(project)}
                className="group relative overflow-hidden border border-white/10 bg-[#111111] text-left aspect-square"
              >
                <img
                  src={project.coverImage}
                  alt={`${project.name} staged interior`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/68 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center p-5 text-center opacity-0 transition duration-500 group-hover:opacity-100 max-[560px]:p-4">
                  <div className="max-w-[18rem]">
                    <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/66">
                      {project.location}
                    </span>
                    <h3 className={`${serifDisplay} mt-2 text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[0.95] text-white`}>
                      {project.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && activeImage ? (
          <m.div
            className="fixed inset-0 z-50 h-[100dvh] overflow-hidden bg-[rgba(0,0,0,0.92)] text-white backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} project gallery`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]">
              <div className="z-[2] flex min-w-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 max-[700px]:bg-black/32 max-[700px]:px-3 max-[700px]:pt-[calc(0.625rem+env(safe-area-inset-top))] max-[700px]:pb-2.5 max-[560px]:gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/44 max-[560px]:text-[0.58rem] max-[560px]:tracking-[0.16em]">
                    {activeProject.location}
                  </p>
                  <h2 className={`${serifDisplay} mt-1 truncate text-[clamp(1.1rem,3vw,3.3rem)] leading-[0.95] max-[560px]:mt-0`}>
                    {activeProject.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeProject}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition duration-200 hover:bg-white/16 max-[560px]:h-10 max-[560px]:w-10"
                  aria-label="Close project gallery"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div
                className="relative min-h-0 min-w-0 overflow-hidden touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={activeImage}
                    className="absolute inset-0 flex min-h-0 items-center justify-center p-6 max-[900px]:p-4 max-[560px]:p-2"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: easeOutExpo }}
                  >
                    <img
                      src={activeImage}
                      alt={`${activeProject.name} image ${activeImageIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                    />
                  </m.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-5 max-[560px]:p-3">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-black/50 text-white backdrop-blur-[10px] transition duration-200 hover:bg-white/12 max-[560px]:h-11 max-[560px]:w-11"
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
                    className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-black/50 text-white backdrop-blur-[10px] transition duration-200 hover:bg-white/12 max-[560px]:h-11 max-[560px]:w-11"
                    aria-label="Next image"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M7 4.5L11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/14 bg-black/50 px-4 py-2 text-[0.74rem] font-extrabold uppercase tracking-[0.2em] text-white/82 backdrop-blur-[10px] max-[560px]:bottom-3 max-[560px]:px-3 max-[560px]:py-1.5 max-[560px]:text-[0.62rem] max-[560px]:tracking-[0.16em]">
                  {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeProject.images.length).padStart(2, "0")}
                </div>
              </div>

              <div className="min-w-0 overflow-hidden border-t border-white/10 bg-black/48 px-5 py-4 backdrop-blur-[14px] max-[700px]:px-3 max-[700px]:pt-3 max-[700px]:pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <div className="flex snap-x gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] max-[560px]:gap-2">
                  {activeProject.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-20 w-28 shrink-0 snap-start overflow-hidden border transition duration-200 max-[700px]:h-16 max-[700px]:w-24 max-[560px]:h-14 max-[560px]:w-20 ${
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
