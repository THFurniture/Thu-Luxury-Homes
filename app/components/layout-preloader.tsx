import { stagger } from "motion";
import { m, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type LayoutPreloaderProps = {
  images: Array<{ src: string; alt: string }>;
  assets?: string[];
  onComplete?: () => void;
};

const panelTransforms = [
  "translate-x-[-16%] translate-y-[12%] rotate-[-9deg] max-[640px]:translate-x-[-7%] max-[640px]:translate-y-[6%]",
  "translate-x-[12%] translate-y-[-10%] rotate-[7deg] max-[640px]:translate-x-[6%] max-[640px]:translate-y-[-5%]",
  "translate-x-[2%] translate-y-0 rotate-[-2deg]",
];
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeHero = [0.6, 0.01, 0.05, 1] as const;
const easeSoft = [0.38, 0.005, 0.215, 1] as const;
const easeFade = [0.4, 0, 0.2, 1] as const;

export default function LayoutPreloader({
  images,
  assets = [],
  onComplete,
}: LayoutPreloaderProps) {
  const [scope, animate] = useAnimate();
  const [isHidden, setIsHidden] = useState(false);
  const [areAssetsLoaded, setAreAssetsLoaded] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const stagedImages =
    images.length > 1 ? [...images.slice(1), images[0]] : images;
  const isPreloaderReady = areAssetsLoaded && isAnimationReady;
  const assetSources = Array.from(
    new Set([
      ...stagedImages.map((image) => image.src),
      ...assets,
      "/theonehomestaging_logo.png",
    ]),
  );
  const assetSourceKey = assetSources.join("|");

  useEffect(() => {
    let isCancelled = false;
    setAreAssetsLoaded(false);
    setIsAnimationReady(false);

    if (typeof window === "undefined" || assetSources.length === 0) {
      setAreAssetsLoaded(true);
      return;
    }

    const preloadAsset = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new window.Image();
        const finalize = () => resolve();

        image.onload = finalize;
        image.onerror = finalize;
        image.src = src;

        if (image.complete) {
          resolve();
        }
      });

    void Promise.all(assetSources.map(preloadAsset)).then(() => {
      if (!isCancelled) {
        setAreAssetsLoaded(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [assetSourceKey]);

  useEffect(() => {
    if (!areAssetsLoaded) return;

    if (stagedImages.length === 0) {
      setIsHidden(true);
      onComplete?.();
      return;
    }

    let isCancelled = false;

    const run = async () => {
      setIsAnimationReady(true);

      if (prefersReducedMotion) {
        onComplete?.();
        setIsHidden(true);
        return;
      }

      await animate(scope.current, { opacity: 1 }, { duration: 0 });

      await Promise.all([
        animate(
          ".image-wrapper",
          {
            opacity: [0, 1],
            clipPath: [
              "inset(100% 0% 0% 0% round 1.75rem)",
              "inset(0% 0% 0% 0% round 1.75rem)",
            ],
          },
          {
            duration: 0.72,
            ease: easeOutExpo,
            delay: stagger(0.15),
          },
        ),
        animate(
          ".image-wrapper img",
          { scale: [1.22, 1.04] },
          {
            duration: 1.2,
            ease: easeHero,
            delay: stagger(0.08),
          },
        ),
        animate(
          ".preloader-side",
          { opacity: [0, 1], y: [32, 0] },
          {
            duration: 0.7,
            ease: easeOutExpo,
            delay: stagger(0.08, { startDelay: 0.22 }),
          },
        ),
      ]);

      await Promise.all([
        animate(
          ".grid-column",
          { scaleY: [0, 1], opacity: [0.35, 1] },
          {
            duration: 0.7,
            ease: easeSoft,
            delay: stagger(0.035, { startDelay: 0.12 }),
          },
        ),
        animate(
          ".preloader-copy",
          { opacity: [0, 1], y: [24, 0], x: ["-50%", "-50%"] },
          {
            duration: 0.35,
            ease: easeOutExpo,
          },
        ),
        animate(
          ".preloader-wordmark .line-inner, .preloader-caption .line-inner",
          { y: ["110%", "0%"] },
          {
            duration: 0.9,
            ease: easeHero,
            delay: stagger(0.08, { startDelay: 0.08 }),
          },
        ),
      ]);

      await Promise.all([
        animate(
          ".preloader-side-left",
          { opacity: 0, x: -80 },
          {
            duration: 0.8,
            ease: easeSoft,
          },
        ),
        animate(
          ".preloader-side-right",
          { opacity: 0, x: 80 },
          {
            duration: 0.8,
            ease: easeSoft,
          },
        ),
      ]);

      onComplete?.();

      await animate(
        scope.current,
        { opacity: 0 },
        {
          duration: 0.6,
          ease: easeFade,
        },
      );

      if (!isCancelled) {
        setIsHidden(true);
      }
    };

    void run();

    return () => {
      isCancelled = true;
    };
  }, [
    animate,
    areAssetsLoaded,
    onComplete,
    prefersReducedMotion,
    scope,
    stagedImages.length,
  ]);

  if (isHidden) return null;

  return (
    <m.div
      ref={scope}
      className="preloader-shell fixed inset-0 z-[100] overflow-hidden bg-[linear-gradient(180deg,#f6f0e8_0%,#ead8c4_100%)]"
      aria-hidden="true"
      initial={{ opacity: 1 }}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-[20] flex items-center justify-center ${
          isPreloaderReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[rgba(105,91,76,0.18)] border-t-[rgba(105,91,76,0.92)]" />
      </div>

      <div className="preloader-grid pointer-events-none absolute inset-0 opacity-0">
        <div className="grid-overlay-inner grid h-full grid-cols-12 gap-3 px-5 max-[560px]:gap-2 max-[560px]:px-4">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="grid-column origin-top border-x border-white/25"
            />
          ))}
        </div>
      </div>

      <div className="preloader-stage relative flex h-full items-center justify-center overflow-hidden px-5 py-5 max-[560px]:px-4">
        <div className="preloader-side preloader-side-left pointer-events-none absolute left-5 top-1/2 z-[2] hidden -translate-y-1/2 text-[0.8rem] font-extrabold uppercase tracking-[0.34em] text-[rgba(105,91,76,0.9)] opacity-0 min-[900px]:block">
          The One
        </div>

        <div
          className={`preloader-container relative h-[18.75rem] w-[25rem] max-w-[82vw] max-[640px]:h-[15rem] max-[640px]:w-[18rem] ${
            isPreloaderReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {stagedImages.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className={`image-wrapper absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/40 bg-[#d8c4ae] opacity-0 shadow-[0_24px_80px_rgba(31,23,18,0.18)] ${
                panelTransforms[index] ?? panelTransforms[panelTransforms.length - 1]
              }`}
              style={{ zIndex: index + 1, clipPath: "inset(100% 0% 0% 0% round 1.75rem)" }}
            >
              <img
                className="h-full w-full scale-[1.22] object-cover"
                src={image.src}
                alt={image.alt}
                loading="eager"
              />
            </figure>
          ))}
        </div>

        <div className="preloader-side preloader-side-right pointer-events-none absolute right-5 top-1/2 z-[2] hidden -translate-y-1/2 text-[0.8rem] font-extrabold uppercase tracking-[0.34em] text-[rgba(105,91,76,0.9)] opacity-0 min-[900px]:block">
          Home Staging
        </div>

        <div
          className={`preloader-copy pointer-events-none absolute left-1/2 top-1/2 z-[15] w-[34rem] max-w-[82vw] rounded-[1.6rem] border border-white/45 bg-[rgba(250,243,235,0.18)] p-5 opacity-0 backdrop-blur-[14px] ${
            isPreloaderReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="preloader-wordmark">
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block translate-y-[110%]">
                <img
                  src="/theonehomestaging_logo.png"
                  alt="The One Home Staging"
                  className="h-auto w-full p-12"
                  loading="eager"
                  draggable={false}
                />
              </span>
            </span>
          </div>

          <p className="preloader-caption mt-4 mx-auto max-w-[20rem] text-center text-[0.86rem] font-extrabold uppercase tracking-[0.18em] text-[rgba(105,91,76,0.92)]">
            <span className="line-mask block overflow-hidden">
              <span className="line-inner block translate-y-[120%]">
                Vancouver&apos;s Premier Home Staging Company
              </span>
            </span>
          </p>
        </div>
      </div>
    </m.div>
  );
}
