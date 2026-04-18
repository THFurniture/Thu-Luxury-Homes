import {
  AnimatePresence,
  m,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, type MouseEvent } from "react";

import { useParallax } from "../lib/use-parallax";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeInStrong = [0.4, 0, 1, 1] as const;
const easeCurtain = [0.65, 0, 0.35, 1] as const;
const easeClose = [0.7, 0, 0.84, 0] as const;

export type ImageRevealItem = {
  images: string[];
  image: string;
  location: string;
  number: string;
  title: string;
  type: string;
};

type ImageRevealProps = {
  items: ImageRevealItem[];
};

type DesktopProjectCardProps = {
  item: ImageRevealItem;
  isLocked: boolean;
  onOpen: () => void;
};

const imageSwapVariants = {
  initial: (direction: 1 | -1) => ({
    opacity: 0,
    scale: 1.035,
    x: direction === 1 ? "3%" : "-3%",
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: "0%",
    transition: { duration: 0.65, ease: easeOutExpo },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    scale: 1.015,
    x: direction === 1 ? "-2%" : "2%",
    transition: { duration: 0.28, ease: easeInStrong },
  }),
};

function DesktopProjectCard({
  item,
  isLocked,
  onOpen,
}: DesktopProjectCardProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawScale = useMotionValue(1.08);

  const titleX = useSpring(useTransform(rawX, (value) => value * 0.05), {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  });
  const titleY = useSpring(useTransform(rawY, (value) => value * 0.05), {
    stiffness: 180,
    damping: 20,
    mass: 0.5,
  });
  const numberX = useSpring(useTransform(rawX, (value) => value * 0.04), {
    stiffness: 180,
    damping: 22,
    mass: 0.55,
  });
  const numberY = useSpring(useTransform(rawY, (value) => value * -0.04), {
    stiffness: 180,
    damping: 22,
    mass: 0.55,
  });
  const imageX = useSpring(useTransform(rawX, (value) => value * 0.025), {
    stiffness: 200,
    damping: 24,
    mass: 0.55,
  });
  const imageY = useSpring(useTransform(rawY, (value) => value * 0.025), {
    stiffness: 200,
    damping: 24,
    mass: 0.55,
  });
  const imageScale = useSpring(rawScale, {
    stiffness: 200,
    damping: 24,
    mass: 0.55,
  });

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLocked) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - bounds.left - bounds.width / 2;
    const mouseY = event.clientY - bounds.top - bounds.height / 2;

    rawX.set(mouseX);
    rawY.set(mouseY);
    rawScale.set(1.12);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    rawScale.set(1.08);
  };

  return (
    <button
      type="button"
      className="group relative flex-1 cursor-pointer border-0 bg-transparent p-0 text-left"
      style={{ height: "32rem" }}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.42)), url(${item.image})`,
            x: imageX,
            y: imageY,
            scale: imageScale,
            willChange: "transform",
          }}
        />
      </div>

      <div className="absolute inset-0 border border-[rgba(255,255,255,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.5)_100%)]" />

      <m.span
        className="absolute right-4 top-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.84)]"
        style={{ x: numberX, y: numberY, willChange: "transform" }}
      >
        {item.number}
      </m.span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <m.span
          className='block max-w-[10rem] font-["Cormorant_Garamond",Georgia,serif] text-[2rem] leading-[0.92] text-[rgba(255,255,255,0.96)]'
          style={{ x: titleX, y: titleY, willChange: "transform" }}
        >
          {item.title}
        </m.span>
        <span className="mt-3 block text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">
          {item.type}
        </span>
      </div>
    </button>
  );
}

export default function ImageReveal({ items }: ImageRevealProps) {
  const [scope, animate] = useAnimate();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const preloadedProjectIndexesRef = useRef<Set<number>>(new Set());
  const isAnimatingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState<1 | -1>(1);

  const prefersReducedMotion = useReducedMotion();
  const { ref: desktopTrackRef, y: desktopTrackY } =
    useParallax<HTMLDivElement>(["0%", "-10%"]);

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const activeImage = activeItem?.images[activeImageIndex] ?? activeItem?.image;

  const preloadProjectImages = (index: number) => {
    if (typeof window === "undefined") return;
    if (preloadedProjectIndexesRef.current.has(index)) return;

    preloadedProjectIndexesRef.current.add(index);

    for (const src of items[index]?.images ?? []) {
      const image = new window.Image();
      image.src = src;
    }
  };

  const resetCurtains = () => {
    if (backgroundRef.current) {
      void animate(backgroundRef.current, { y: "100%" }, { duration: 0 });
    }

    if (detailRef.current) {
      void animate(detailRef.current, { y: "100%" }, { duration: 0 });
    }
  };

  const runOpenTransition = async () => {
    if (prefersReducedMotion || !backgroundRef.current || !detailRef.current) {
      resetCurtains();
      return;
    }

    await Promise.all([
      animate(
        backgroundRef.current,
        { y: ["100%", "0%", "-100%"] },
        {
          duration: 1,
          ease: easeCurtain,
          times: [0, 0.55, 1],
        },
      ),
      animate(
        detailRef.current,
        { y: ["100%", "100%", "0%"] },
        {
          duration: 0.85,
          ease: easeOutExpo,
          times: [0, 0.21, 1],
        },
      ),
    ]);

    resetCurtains();
    await animate(detailRef.current, { y: "0%" }, { duration: 0 });
  };

  const runCloseTransition = async () => {
    if (prefersReducedMotion || !backgroundRef.current || !detailRef.current) {
      resetCurtains();
      return;
    }

    await Promise.all([
      animate(
        backgroundRef.current,
        { y: ["100%", "0%", "-100%"] },
        {
          duration: 0.85,
          ease: easeCurtain,
          times: [0, 0.52, 1],
        },
      ),
      animate(detailRef.current, { y: "100%" }, {
        duration: 0.7,
        ease: easeClose,
        delay: 0.08,
      }),
    ]);

    resetCurtains();
  };

  const handleItemClick = async (index: number) => {
    if (activeIndex !== null || isAnimatingRef.current) return;

    preloadProjectImages(index);
    setActiveImageIndex(0);
    setImageDirection(1);
    setActiveIndex(index);
    isAnimatingRef.current = true;

    try {
      await runOpenTransition();
    } finally {
      isAnimatingRef.current = false;
    }
  };

  const handleBackClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isAnimatingRef.current || activeIndex === null) return;

    isAnimatingRef.current = true;

    try {
      await runCloseTransition();
      setActiveIndex(null);
      setActiveImageIndex(0);
    } finally {
      isAnimatingRef.current = false;
    }
  };

  const handlePrevImage = () => {
    if (!activeItem) return;
    setImageDirection(-1);
    setActiveImageIndex((current) =>
      current === 0 ? activeItem.images.length - 1 : current - 1,
    );
  };

  const handleNextImage = () => {
    if (!activeItem) return;
    setImageDirection(1);
    setActiveImageIndex((current) =>
      current === activeItem.images.length - 1 ? 0 : current + 1,
    );
  };

  const handleMobileItemToggle = (index: number) => {
    const initialImageIndex = items[index].images.indexOf(items[index].image);
    const isOpening = activeIndex !== index;

    if (isOpening) {
      preloadProjectImages(index);
    }

    setImageDirection(1);
    setActiveImageIndex(initialImageIndex >= 0 ? initialImageIndex : 0);
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <m.div
      ref={scope}
      className="reveal-fade portfolio-track relative left-1/2 w-screen -translate-x-1/2"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
    >
      <m.div
        ref={desktopTrackRef}
        className="hidden min-h-[40rem] min-[901px]:block"
        style={{
          y: desktopTrackY,
          willChange: prefersReducedMotion ? undefined : "transform",
        }}
      >
        <div className="relative overflow-hidden bg-[#080808] px-8 py-10">
          <div
            ref={backgroundRef}
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(18,18,18,0.96)_0%,rgba(0,0,0,0.92)_100%)]"
            style={{ transform: "translateY(100%)" }}
          />

          <div className="mx-auto flex min-h-[35rem] max-w-[100rem] items-end gap-5">
            {items.map((item, index) => (
              <DesktopProjectCard
                key={item.title}
                item={item}
                isLocked={activeIndex !== null}
                onOpen={() => void handleItemClick(index)}
              />
            ))}
          </div>

          <div
            ref={detailRef}
            className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(18,18,18,0.98)_0%,rgba(0,0,0,0.95)_100%)] px-8 py-8 text-white"
            style={{ transform: "translateY(100%)" }}
          >
            {activeItem ? (
              <div className="mx-auto grid h-full max-w-[100rem] grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.68fr)] gap-8 max-[1100px]:grid-cols-1">
                <div className="relative overflow-hidden">
                  <AnimatePresence initial={false} custom={imageDirection} mode="wait">
                    <m.img
                      key={activeImage}
                      custom={imageDirection}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={activeImage}
                      alt={activeItem.title}
                      variants={imageSwapVariants}
                      initial={prefersReducedMotion ? false : "initial"}
                      animate="animate"
                      exit="exit"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.32)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <div className="rounded-full bg-[rgba(255,255,255,0.14)] px-3 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.82)] backdrop-blur-[10px]">
                      {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(activeItem.images.length).padStart(2, "0")}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.12)] text-[1.25rem] text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,255,255,0.18)]"
                        aria-label="Previous project image"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.12)] text-[1.25rem] text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,255,255,0.18)]"
                        aria-label="Next project image"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[24rem] flex-col justify-between border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.06)_100%)] p-7 backdrop-blur-[14px]">
                  <div>
                    <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.64)]">
                      {activeItem.number}
                    </span>
                    <h3 className='mt-4 font-["Cormorant_Garamond",Georgia,serif] text-[clamp(2.6rem,4vw,4.3rem)] leading-[0.92] text-white'>
                      {activeItem.title}
                    </h3>
                    <p className="mt-4 text-[0.86rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">
                      {activeItem.type}
                    </p>
                    <p className="mt-2 text-[1rem] leading-[1.7] text-[rgba(255,255,255,0.82)]">
                      {activeItem.location}
                    </p>
                    <p className="mt-6 max-w-[26rem] text-[1rem] leading-[1.8] text-[rgba(255,255,255,0.82)]">
                      Every staging plan is composed to sharpen first impressions,
                      guide buyer attention, and make the property feel resolved
                      the moment they step inside.
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.9rem] leading-[1.6] text-[rgba(255,255,255,0.7)]">
                      Click back to return to the project lineup.
                    </span>
                    <button
                      type="button"
                      onClick={(event) => void handleBackClick(event)}
                      className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] px-5 py-3 text-[0.9rem] font-bold text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,255,255,0.12)]"
                    >
                      Back to projects
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </m.div>

      <div className="relative z-10 grid gap-5 px-5 min-[901px]:hidden max-[560px]:gap-4 max-[560px]:px-4">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const mobileImage = isActive
            ? activeItem?.images[activeImageIndex] ?? item.image
            : item.image;

          return (
            <article
              key={item.title}
              className="overflow-hidden border border-white/10 bg-[#111111] shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
            >
              <button
                type="button"
                onClick={() => handleMobileItemToggle(index)}
                className="block w-full cursor-pointer text-left"
                aria-expanded={isActive}
                aria-controls={`mobile-project-${index}`}
              >
                <div className="relative h-[20rem] overflow-hidden max-[560px]:h-[16.5rem]">
                  <AnimatePresence
                    initial={false}
                    custom={imageDirection}
                    mode="wait"
                  >
                    <m.img
                      key={mobileImage}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={mobileImage}
                      alt={item.title}
                      custom={imageDirection}
                      variants={imageSwapVariants}
                      initial={
                        prefersReducedMotion || !isActive
                          ? false
                          : "initial"
                      }
                      animate="animate"
                      exit="exit"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.28)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 max-[560px]:p-4">
                    <div>
                      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.8)]">
                        {item.number}
                      </span>
                      <h3 className='mt-2 font-["Cormorant_Garamond",Georgia,serif] text-[2.1rem] leading-[0.95] text-white max-[560px]:text-[1.8rem]'>
                        {item.title}
                      </h3>
                    </div>
                    <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.14)] px-3 text-[1rem] text-white backdrop-blur-[10px]">
                      {isActive ? "-" : "+"}
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <m.div
                    id={`mobile-project-${index}`}
                    className="overflow-hidden"
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
                  >
                    <div className="space-y-5 border-t border-[rgba(255,255,255,0.12)] p-5 max-[560px]:space-y-4 max-[560px]:p-4">
                      <p className="text-[0.86rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.72)]">
                        {item.type}
                      </p>
                      <p className="text-[0.98rem] leading-[1.65] text-[rgba(255,255,255,0.84)]">
                        {item.location}
                      </p>
                      <p className="text-[0.98rem] leading-[1.75] text-[rgba(255,255,255,0.82)]">
                        Every staging plan is composed to sharpen first impressions,
                        guide buyer attention, and make the property feel resolved
                        the moment they step inside.
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.64)]">
                          {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                          {String(item.images.length).padStart(2, "0")}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePrevImage}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.12)] text-[1.15rem] text-white"
                            aria-label="Previous project image"
                          >
                            &larr;
                          </button>
                          <button
                            type="button"
                            onClick={handleNextImage}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.12)] text-[1.15rem] text-white"
                            aria-label="Next project image"
                          >
                            &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </m.div>
  );
}
