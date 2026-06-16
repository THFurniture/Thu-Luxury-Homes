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

export function buildPageMeta({
  title,
  description,
  origin,
  pathname,
  imagePath,
  imageAlt,
}: BuildMetaArgs): MetaDescriptor[] {
  const canonicalUrl = absoluteUrl(origin, pathname);
  const imageUrl = absoluteUrl(origin, imagePath);

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Thu Luxury Homes" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}
