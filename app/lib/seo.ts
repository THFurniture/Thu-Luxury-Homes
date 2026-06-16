import type { MetaDescriptor } from "react-router";

type RootLoaderData = {
  origin?: string;
};

type MetaMatchWithLoaderData = {
  id: string;
  loaderData?: unknown;
};

type BuildMetaArgs = {
  title: string;
  description: string;
  origin: string;
  pathname: string;
  imagePath: string;
  imageAlt: string;
};

const ogImageVersion = "20260616";

export function getRequestOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ?? requestUrl.protocol.replace(":", "");

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return requestUrl.origin;
}

export function getMetaOrigin(matches: readonly (MetaMatchWithLoaderData | undefined)[]) {
  const rootMatch = matches.find((match) => match?.id === "root");
  const rootData = rootMatch?.loaderData as RootLoaderData | undefined;

  return rootData?.origin ?? "https://thuluxuryhomes.com";
}

export function absoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

function canonicalUrl(origin: string, pathname: string) {
  const url = new URL(pathname || "/", origin);

  if (url.pathname === "/") {
    return url.origin;
  }

  url.pathname = url.pathname.replace(/\/+$/, "");

  return url.toString();
}

function ogImageUrl(origin: string, imagePath: string) {
  const url = new URL(imagePath, origin);
  url.searchParams.set("v", ogImageVersion);

  return url.toString();
}

export function buildPageMeta({
  title,
  description,
  origin,
  pathname,
  imagePath,
  imageAlt,
}: BuildMetaArgs): MetaDescriptor[] {
  const pageUrl = canonicalUrl(origin, pathname);
  const imageUrl = ogImageUrl(origin, imagePath);

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: pageUrl },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Thu Luxury Homes" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:url", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}
