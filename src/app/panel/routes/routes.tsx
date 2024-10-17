// react
import { lazy, ReactNode, Suspense } from "react";
// error page
import ErrorPage from "../../errors/ErrorPage";
// main page
import PanelRoot from "../PanelRoot";
import Fallback from "../fallback/Fallback";

const Home = lazy(() => import("../pages/home/Home"));
const NotFound404 = lazy(() => import("../../../components/Notfound404"));

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