import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "react-router";
import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

import type { Route } from "./+types/root";
import useScrollToTop from "./hooks/useScrollToTop";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { getRequestOrigin } from "./lib/seo";
import "./app.css";

export const links: Route.LinksFunction = () => [];

export function loader({ request }: Route.LoaderArgs) {
  return {
    origin: getRequestOrigin(request),
  };
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-[#050505] text-[#f5f5f5] scroll-auto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className='min-w-80 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_22%),linear-gradient(180deg,#050505_0%,#101010_100%)] font-["Roboto",ui-sans-serif,system-ui,sans-serif] font-thin text-[#f5f5f5] antialiased'>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useSmoothScroll();
  useScrollToTop();

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="px-6 py-24 text-[#f5f5f5]">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className="overflow-x-auto">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
