// pages
import Home from "./ui/home/Home";
// import News from "./ui/news/News";
// import NewsDetail from "./ui/news/NewsDetail";
// error page
import ErrorPage from "../errors/ErrorPage";
// main page
import Landing from "./Landing";

export const landingRoutes = {
  path: "/",
  element: <Landing />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <Home />,
    },
  ],
};
