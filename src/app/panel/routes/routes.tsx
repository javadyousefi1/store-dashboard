// react
import { lazy, ReactNode, Suspense } from "react";
// error page
import ErrorPage from "../../errors/ErrorPage";
import PanelRoot from "../PanelRoot";
// main page
import Fallback from "@/app/panel/fallback/Fallback";

const Home = lazy(() => import("../pages/home/Home"));
const NotFound404 = lazy(() => import("@/components/Notfound404"));

interface SuspenseWrapperProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: ReactNode;
}

// Reusable Suspense Wrapper
const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  component: Component,
  fallback = <Fallback />,
}) => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

export const mainRoute = {
  path: "/",
  element: <SuspenseWrapper component={NotFound404} />,
  errorElement: <ErrorPage />,
  children: [
    { path: "*", element: <SuspenseWrapper component={NotFound404} /> },
  ],
};

// main routes
export const mainPanelRoutes = {
  path: `/`,
  element: <PanelRoot />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <SuspenseWrapper component={Home} />,
    },
    { path: "*", element: <SuspenseWrapper component={NotFound404} /> },
  ],
};