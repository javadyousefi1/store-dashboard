// const baseUrl = import.meta.env.VITE_APP_BASE_URL
// rrd
import { createBrowserRouter } from "react-router-dom";
// routes
import { landingRoutes } from "../app/landing/Landing.routes";
import { LoginRoutes } from "../app/auth/Login.routes";
import { panelRoutes } from "../app/panel/routes/panel.routes";

const router = createBrowserRouter([panelRoutes, LoginRoutes]);

export default router;
