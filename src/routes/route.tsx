const baseUrl = import.meta.env.VITE_APP_BASE_URL
// rrd
import { createBrowserRouter } from "react-router-dom";
// routes
import { landingRoutes } from "../app/landing/Landing.routes";

const router = createBrowserRouter([landingRoutes],{basename:baseUrl});

export default router;
