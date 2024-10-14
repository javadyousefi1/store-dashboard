const baseUrl = import.meta.env.VITE_APP_BASE_URL
// rrd
import { createBrowserRouter } from "react-router-dom";
// routes
import { panelRoutes } from "@/app/panel/panel.routes";

const router = createBrowserRouter([panelRoutes],{basename:baseUrl});

export default router;
