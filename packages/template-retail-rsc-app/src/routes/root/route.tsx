import { Outlet } from "react-router";

export { ErrorBoundary, Layout } from "./client";

export default function Component() {
  return <Outlet />;
}
