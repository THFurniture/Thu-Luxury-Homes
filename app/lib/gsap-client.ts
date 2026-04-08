import gsap from "gsap";

type ScrollTriggerType = {
  update: () => void;
  refresh: () => void;
};

type CustomEaseType = {
  create: (id: string, data: string) => unknown;
};

type FlipType = {
  getState: (target: unknown) => unknown;
  from: (state: unknown, vars: Record<string, unknown>) => unknown;
};

let scrollTriggerPromise: Promise<ScrollTriggerType> | undefined;
let preloaderPluginsPromise:
  | Promise<{ CustomEase: CustomEaseType; Flip: FlipType }>
  | undefined;

export function loadScrollTrigger() {
  scrollTriggerPromise ??= import("gsap/ScrollTrigger.js").then(
    ({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger;
    },
  );

  return scrollTriggerPromise;
}

export function loadPreloaderPlugins() {
  preloaderPluginsPromise ??= Promise.all([
    import("gsap/CustomEase.js"),
    import("gsap/Flip.js"),
  ]).then(([{ CustomEase }, { Flip }]) => {
    gsap.registerPlugin(CustomEase, Flip);
    return { CustomEase, Flip };
  });

  return preloaderPluginsPromise;
}
