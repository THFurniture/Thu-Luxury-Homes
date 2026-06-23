import type { Project } from "../../data/projects";

export function stripStreetNumber(name: string) {
  return name.replace(/\s+\d+\s*$/, "").trim();
}

export function clampImageIndex(project: Project, imageIndex: number) {
  if (project.images.length === 0) return 0;
  return (imageIndex + project.images.length) % project.images.length;
}

export function preloadProjectImages(project: Project) {
  if (typeof window === "undefined") return;

  for (const src of project.images) {
    const image = new window.Image();
    image.src = src;
  }
}
