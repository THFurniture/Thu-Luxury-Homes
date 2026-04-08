import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

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

function getWrapHeight(index: number): string {
  if (index % 4 === 1) return "30rem";
  if (index % 4 === 2) return "22rem";
  if (index % 4 === 3) return "27rem";
  return "25rem";
}

export default function ImageReveal({ items }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLImageElement>(null);
  const mobileActiveImageRef = useRef<HTMLImageElement>(null);
  const previousMobileStateRef = useRef<{
    activeIndex: number | null;
    activeImage: string | null;
  }>({
    activeIndex: null,
    activeImage: null,
  });

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const preloadedProjectIndexesRef = useRef<Set<number>>(new Set());

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState<1 | -1>(1);

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

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(backgroundRef.current, { y: "100%" });
      gsap.set(detailRef.current, { y: "100%" });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!activeIndex && activeIndex !== 0) return;
      if (!activeImageRef.current) return;

      gsap.fromTo(
        activeImageRef.current,
        {
          autoAlpha: 0,
          scale: 1.035,
          xPercent: imageDirection === 1 ? 3 : -3,
        },
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: "power3.out",
          scale: 1,
          xPercent: 0,
        },
      );
    },
    {
      scope: containerRef,
      dependencies: [activeImageIndex, activeIndex, imageDirection],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      if (!activeIndex && activeIndex !== 0) return;
      if (!mobileActiveImageRef.current) return;
      if (!activeImage) return;

      const previousState = previousMobileStateRef.current;
      const shouldAnimate =
        previousState.activeIndex === activeIndex &&
        previousState.activeImage !== null &&
        previousState.activeImage !== activeImage;

      previousMobileStateRef.current = {
        activeIndex,
        activeImage,
      };

      if (!shouldAnimate) return;

      gsap.fromTo(
        mobileActiveImageRef.current,
        {
          autoAlpha: 0,
          scale: 1.02,
          xPercent: imageDirection === 1 ? 2 : -2,
        },
        {
          autoAlpha: 1,
          duration: 0.55,
          ease: "power2.out",
          scale: 1,
          xPercent: 0,
        },
      );
    },
    {
      scope: containerRef,
      dependencies: [activeImageIndex, activeIndex, imageDirection],
      revertOnUpdate: true,
    },
  );

  const handleItemClick = contextSafe((index: number) => {
    if (activeIndex !== null) return;

    preloadProjectImages(index);
    setActiveImageIndex(0);
    setActiveIndex(index);

    const tl = gsap.timeline();
    tl.fromTo(
      backgroundRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.55, ease: "power3.inOut" },
    )
      .fromTo(
        detailRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.85, ease: "power4.out" },
        "-=0.18",
      )
      .to(
        backgroundRef.current,
        { y: "-100%", duration: 0.45, ease: "power3.inOut" },
        "-=0.55",
      );
  });

  const handleBackClick = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(null);
        setActiveImageIndex(0);
        gsap.set(backgroundRef.current, { y: "100%" });
        gsap.set(detailRef.current, { y: "100%" });
      },
    });

    tl.fromTo(
      backgroundRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.45, ease: "power3.inOut" },
    )
      .to(
        detailRef.current,
        { y: "100%", duration: 0.7, ease: "power4.inOut" },
        "-=0.08",
      )
      .to(
        backgroundRef.current,
        { y: "-100%", duration: 0.4, ease: "power3.inOut" },
        "-=0.48",
      );
  });

  const handleMouseMove = contextSafe(
    (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      if (activeIndex !== null) return;

      const element = itemRefs.current[index];
      if (!element) return;

      const bounds = element.getBoundingClientRect();
      const mouseX = event.clientX - bounds.left - bounds.width / 2;
      const mouseY = event.clientY - bounds.top - bounds.height / 2;

      gsap.to(titleRefs.current[index], {
        duration: 0.9,
        x: mouseX * 0.05,
        y: mouseY * 0.05,
      });
      gsap.to(numberRefs.current[index], {
        duration: 1.1,
        x: mouseX * 0.04,
        y: mouseY * -0.04,
      });
      gsap.to(imageRefs.current[index], {
        duration: 1,
        scale: 1.12,
        x: mouseX * 0.025,
        y: mouseY * 0.025,
      });
    },
  );

  const handleMouseLeave = contextSafe((_event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    gsap.to(titleRefs.current[index], { duration: 0.9, x: 0, y: 0 });
    gsap.to(numberRefs.current[index], { duration: 0.9, x: 0, y: 0 });
    gsap.to(imageRefs.current[index], { duration: 0.9, scale: 1.08, x: 0, y: 0 });
  });

  const handlePrevImage = contextSafe(() => {
    if (!activeItem) return;
    setImageDirection(-1);
    setActiveImageIndex((current) =>
      current === 0 ? activeItem.images.length - 1 : current - 1,
    );
  });

  const handleNextImage = contextSafe(() => {
    if (!activeItem) return;
    setImageDirection(1);
    setActiveImageIndex((current) =>
      current === activeItem.images.length - 1 ? 0 : current + 1,
    );
  });

  const handleMobileItemToggle = contextSafe((index: number) => {
    const initialImageIndex = items[index].images.indexOf(items[index].image);
    const isOpening = activeIndex !== index;

    if (isOpening) {
      preloadProjectImages(index);
    }

    setImageDirection(1);
    setActiveImageIndex(initialImageIndex >= 0 ? initialImageIndex : 0);
    setActiveIndex((current) => (current === index ? null : index));
  });

  return (
    <div
      ref={containerRef}
      className="reveal-fade portfolio-track relative left-1/2 w-screen -translate-x-1/2"
    >
      <div className="hidden min-h-[40rem] min-[901px]:block">
        <div className="relative overflow-hidden bg-[#efe3d5] px-8 py-10">
          <div
            ref={backgroundRef}
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(92,61,36,0.94)_0%,rgba(63,42,27,0.9)_100%)]"
          />

          <div className="mx-auto flex min-h-[35rem] max-w-[100rem] items-end gap-5">
            {items.map((item, index) => (
              <button
                key={item.title}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                type="button"
                className="group relative flex-1 cursor-pointer border-0 bg-transparent p-0 text-left"
                style={{ height: getWrapHeight(index) }}
                onClick={() => handleItemClick(index)}
                onMouseMove={(event) => handleMouseMove(event, index)}
                onMouseLeave={(event) => handleMouseLeave(event, index)}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[1.6rem]">
                  <div
                    ref={(element) => {
                      imageRefs.current[index] = element;
                    }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(19, 14, 10, 0.08), rgba(19, 14, 10, 0.4)), url(${item.image})`,
                      transform: "scale(1.08)",
                    }}
                  />
                </div>

                <div className="absolute inset-0 rounded-[1.6rem] border border-[rgba(255,248,241,0.24)] bg-[linear-gradient(180deg,rgba(61,40,24,0.04)_0%,rgba(61,40,24,0.46)_100%)]" />

                <span
                  ref={(element) => {
                    numberRefs.current[index] = element;
                  }}
                  className="absolute right-4 top-4 text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,244,235,0.86)]"
                >
                  {item.number}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span
                    ref={(element) => {
                      titleRefs.current[index] = element;
                    }}
                    className='block max-w-[10rem] font-["Cormorant_Garamond",Georgia,serif] text-[2rem] leading-[0.92] text-[rgba(255,248,241,0.96)]'
                  >
                    {item.title}
                  </span>
                  <span className="mt-3 block text-[0.82rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(255,244,235,0.72)]">
                    {item.type}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div
            ref={detailRef}
            className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(77,51,31,0.96)_0%,rgba(56,37,23,0.95)_100%)] px-8 py-8 text-[rgba(255,248,241,1)]"
          >
            {activeItem ? (
              <div className="mx-auto grid h-full max-w-[100rem] grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.68fr)] gap-8 max-[1100px]:grid-cols-1">
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <img
                    ref={activeImageRef}
                    key={activeImage}
                    className="h-full w-full object-cover"
                    src={activeImage}
                    alt={activeItem.title}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,13,9,0.04)_0%,rgba(20,13,9,0.32)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <div className="rounded-full bg-[rgba(28,18,11,0.42)] px-3 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(255,244,235,0.82)] backdrop-blur-[10px]">
                      {String(activeImageIndex + 1).padStart(2, "0")} / {String(activeItem.images.length).padStart(2, "0")}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,248,241,0.24)] bg-[rgba(28,18,11,0.35)] text-[1.25rem] text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,248,241,0.14)]"
                        aria-label="Previous project image"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,248,241,0.24)] bg-[rgba(28,18,11,0.35)] text-[1.25rem] text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,248,241,0.14)]"
                        aria-label="Next project image"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[24rem] flex-col justify-between rounded-[1.7rem] border border-[rgba(255,248,241,0.18)] bg-[linear-gradient(180deg,rgba(255,248,241,0.14)_0%,rgba(255,248,241,0.08)_100%)] p-7 backdrop-blur-[14px]">
                  <div>
                    <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,244,235,0.64)]">
                      {activeItem.number}
                    </span>
                    <h3 className='mt-4 font-["Cormorant_Garamond",Georgia,serif] text-[clamp(2.6rem,4vw,4.3rem)] leading-[0.92] text-white'>
                      {activeItem.title}
                    </h3>
                    <p className="mt-4 text-[0.86rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(255,244,235,0.72)]">
                      {activeItem.type}
                    </p>
                    <p className="mt-2 text-[1rem] leading-[1.7] text-[rgba(255,244,235,0.82)]">
                      {activeItem.location}
                    </p>
                    <p className="mt-6 max-w-[26rem] text-[1rem] leading-[1.8] text-[rgba(255,244,235,0.82)]">
                      Every staging plan is composed to sharpen first impressions,
                      guide buyer attention, and make the property feel resolved
                      the moment they step inside.
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.9rem] leading-[1.6] text-[rgba(255,244,235,0.7)]">
                      Click back to return to the project lineup.
                    </span>
                    <button
                      type="button"
                      onClick={handleBackClick}
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(255,248,241,0.24)] px-5 py-3 text-[0.9rem] font-bold text-white transition duration-200 hover:-translate-y-px hover:bg-[rgba(255,248,241,0.12)] cursor-pointer"
                    >
                      Back to projects
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-5 px-5 min-[901px]:hidden max-[560px]:gap-4 max-[560px]:px-4">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const mobileImage = isActive
            ? activeItem?.images[activeImageIndex] ?? item.image
            : item.image;

          return (
            <article
              key={item.title}
              className="overflow-hidden rounded-[1.7rem] border border-[rgba(109,71,39,0.14)] bg-[#efe3d5] shadow-[0_22px_60px_rgba(82,55,32,0.1)]"
            >
              <button
                type="button"
                onClick={() => handleMobileItemToggle(index)}
                className="block w-full cursor-pointer text-left"
                aria-expanded={isActive}
                aria-controls={`mobile-project-${index}`}
              >
                <div className="relative h-[20rem] overflow-hidden max-[560px]:h-[16.5rem]">
                  <img
                    ref={isActive ? mobileActiveImageRef : null}
                    key={mobileImage}
                    className="h-full w-full object-cover"
                    src={mobileImage}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,13,9,0.04)_0%,rgba(20,13,9,0.24)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 max-[560px]:p-4">
                    <div>
                      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-[rgba(255,244,235,0.78)]">
                        {item.number}
                      </span>
                      <h3 className='mt-2 font-["Cormorant_Garamond",Georgia,serif] text-[2.1rem] leading-[0.95] text-[#fff8f1] max-[560px]:text-[1.8rem]'>
                        {item.title}
                      </h3>
                    </div>
                    <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[rgba(255,248,241,0.3)] bg-[rgba(28,18,11,0.28)] px-3 text-[1rem] text-white backdrop-blur-[10px]">
                      {isActive ? "−" : "+"}
                    </span>
                  </div>
                </div>
              </button>

              <div
                id={`mobile-project-${index}`}
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${isActive ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-5 border-t border-[rgba(109,71,39,0.12)] p-5 max-[560px]:space-y-4 max-[560px]:p-4">
                  <p className="text-[0.86rem] font-extrabold uppercase tracking-[0.16em] text-[rgba(109,71,39,1)]">
                    {item.type}
                  </p>
                  <p className="text-[0.98rem] leading-[1.65] text-[rgba(105,91,76,0.92)]">
                    {item.location}
                  </p>
                  <p className="text-[0.98rem] leading-[1.75] text-[rgba(105,91,76,0.92)]">
                    Every staging plan is composed to sharpen first impressions,
                    guide buyer attention, and make the property feel resolved
                    the moment they step inside.
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[rgba(105,91,76,0.78)]">
                      {String(activeImageIndex + 1).padStart(2, "0")} / {String(item.images.length).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(109,71,39,0.18)] bg-[rgba(255,248,241,0.6)] text-[1.15rem] text-[#1f1712]"
                        aria-label="Previous project image"
                      >
                        &larr;
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(109,71,39,0.18)] bg-[rgba(255,248,241,0.6)] text-[1.15rem] text-[#1f1712]"
                        aria-label="Next project image"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
