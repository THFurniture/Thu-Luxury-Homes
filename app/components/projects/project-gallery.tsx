import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type TouchEvent } from "react";

import type { Project } from "../../data/projects";
import { projectsEaseOutExpo, projectsSerifDisplay } from "./projects-styles";
import { clampImageIndex, stripStreetNumber } from "./projects-utils";

type ProjectGalleryOverlayProps = {
  project: Project | null;
  onClose: () => void;
};

type ProjectGalleryProps = {
  project: Project;
  onClose: () => void;
};

function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeImage = project.images[activeImageIndex];

  const showPreviousImage = () => {
    setActiveImageIndex((current) => clampImageIndex(project, current - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => clampImageIndex(project, current + 1));
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;

    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 40) return;
    if (delta < 0) showNextImage();
    else showPreviousImage();
  };

  // Synchronizes the open gallery with the browser's document scroll state.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  // Synchronizes the open gallery with the browser's global keyboard events.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          clampImageIndex(project, current - 1),
        );
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          clampImageIndex(project, current + 1),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, project]);

  return (
    <m.div
      className="fixed inset-0 z-50 h-[100dvh] overflow-hidden bg-[rgba(0,0,0,0.92)] text-white backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${stripStreetNumber(project.name)} project gallery`}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className="grid h-full min-h-0 w-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]">
        <div className="z-[2] flex min-w-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 max-[700px]:bg-black/32 max-[700px]:px-3 max-[700px]:pt-[calc(0.625rem+env(safe-area-inset-top))] max-[700px]:pb-2.5 max-[560px]:gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-white/44 max-[560px]:text-[0.58rem] max-[560px]:tracking-[0.16em]">
              {project.location}
            </p>
            <h2
              className={`${projectsSerifDisplay} mt-1 truncate text-[clamp(1.1rem,3vw,3.3rem)] leading-[0.95] max-[560px]:mt-0`}
            >
              {stripStreetNumber(project.name)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition duration-200 hover:bg-white/16 max-[560px]:h-10 max-[560px]:w-10"
            aria-label="Close project gallery"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="relative min-h-0 min-w-0 touch-pan-y overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={activeImage}
              className="absolute inset-0 flex min-h-0 items-center justify-center p-6 max-[900px]:p-4 max-[560px]:p-2"
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.32, ease: projectsEaseOutExpo }}
            >
              <img
                src={activeImage}
                alt={`${stripStreetNumber(project.name)} image ${activeImageIndex + 1}`}
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11 4.5L6.5 9l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 4.5L11.5 9 7 13.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/14 bg-black/50 px-4 py-2 text-[0.74rem] font-extrabold uppercase tracking-[0.2em] text-white/82 backdrop-blur-[10px] max-[560px]:bottom-3 max-[560px]:px-3 max-[560px]:py-1.5 max-[560px]:text-[0.62rem] max-[560px]:tracking-[0.16em]">
            {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
            {String(project.images.length).padStart(2, "0")}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden border-t border-white/10 bg-black/48 px-5 py-4 backdrop-blur-[14px] max-[700px]:px-3 max-[700px]:pt-3 max-[700px]:pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <div className="flex snap-x gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] max-[560px]:gap-2">
            {project.images.map((image, index) => (
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
  );
}

export function ProjectGalleryOverlay({
  project,
  onClose,
}: ProjectGalleryOverlayProps) {
  return (
    <AnimatePresence>
      {project && project.images.length > 0 ? (
        <ProjectGallery key={project.slug} project={project} onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}
