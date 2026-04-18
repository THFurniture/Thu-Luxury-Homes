import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about-us", "routes/about-us.tsx"),
  route("projects", "routes/projects.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
