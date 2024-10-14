// react
import { lazy, ReactNode, Suspense } from "react";
// error page
import ErrorPage from "../../errors/ErrorPage";
import PanelRoot from "../Landing";
// main page
import Fallback from "@/app/panel/fallback/Fallback";
import { modules } from "@/enums/modules";

const Home = lazy(() => import("../pages/home/Home"));
const InviteToWork = lazy(() => import("../pages/inviteToWork/InviteToWork"));
const Rss = lazy(() => import("../pages/rss/Rss"));
const RssLink = lazy(() => import("../pages/rssLink/RssLink"));
const Setting = lazy(() => import("../pages/setting/Setting"));
const Slider = lazy(() => import("../pages/slider/Slider"));
const Survey = lazy(() => import("../pages/survey/Survey"));
const Tree = lazy(() => import("../pages/tree/Tree"));
const Book = lazy(() => import("../pages/book/Book"));
const Versions = lazy(() => import("../pages/book/versions/Versions"));
const NotFound404 = lazy(() => import("@/components/Notfound404"));
const Accident = lazy(() => import("../pages/accident/Accident"));
const Degree = lazy(() => import("../pages/exam/degree/Degree"));
const Exam = lazy(() => import("../pages/exam/createExam/Exam"));
const Guideline = lazy(() => import("../pages/exam/guideline/Guideline"));
const Operation = lazy(() => import("../pages/exam/operation/Operation"));
const testItems = lazy(() => import("../pages/exam/testItems/TestItems"));

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
  path: `/${modules.MAIN}`,
  element: <PanelRoot />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <SuspenseWrapper component={Home} />,
    },
    {
      path: "slider",
      element: <SuspenseWrapper component={Slider} />,
    },
    {
      path: "setting",
      element: <SuspenseWrapper component={Setting} />,
    },
    {
      path: "rss-link",
      element: <SuspenseWrapper component={RssLink} />,
    },
    {
      path: "survey",
      element: <SuspenseWrapper component={Survey} />,
    },
    {
      path: "rss",
      element: <SuspenseWrapper component={Rss} />,
    },
    {
      path: "invite-to-work",
      element: <SuspenseWrapper component={InviteToWork} />,
    },
    {
      path: "tree",
      element: <SuspenseWrapper component={Tree} />,
    },
    {
      path: "book",
      element: <SuspenseWrapper component={Book} />,
    },
    {
      path: "versions",
      element: <SuspenseWrapper component={Versions} />,
    },
    { path: "*", element: <SuspenseWrapper component={NotFound404} /> },
  ],
};

// acccident routes
export const accidentsRoutes = {
  path: `/${modules.ACCIDENT}`,
  element: <PanelRoot />,
  errorElement: <ErrorPage />,
  breadcrumb: "اخبار",
  children: [
    {
      path: "",
      element: <SuspenseWrapper component={Accident} />,
    },
    {
      path: "setting",
      element: <SuspenseWrapper component={Setting} />,
    },
    { path: "*", element: <SuspenseWrapper component={NotFound404} /> },
  ],
};

// exams routes
export const examRoutes = {
  path: `/${modules.EXAMS}`,
  element: <PanelRoot />,
  errorElement: <ErrorPage />,
  breadcrumb: "آزمون",
  children: [
    {
      path: "",
      element: <SuspenseWrapper component={Degree} />,
    },
    {
      path: "create-exam",
      element: <SuspenseWrapper component={Exam} />,
    },
    {
      path: "guideline",
      element: <SuspenseWrapper component={Guideline} />,
    },
    {
      path: "operation",
      element: <SuspenseWrapper component={Operation} />,
    },
    {
      path: "testItems",
      element: <SuspenseWrapper component={testItems} />,
    },
    { path: "*", element: <SuspenseWrapper component={NotFound404} /> },
    //   {
    //     path: "/setting",
    //     element: <Setting />,
    //   },
  ],
};
