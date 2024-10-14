// routes
import { accidentsRoutes, examRoutes, mainPanelRoutes, mainRoute } from "./routes";
// enums
import { modules } from "@/enums/modules";

// get query-string
const querys = window.location.pathname.split("/")[2]

// change routes by query string
function switchRoute() {
  switch (querys) {
    case modules.ACCIDENT:
      return accidentsRoutes;
    case modules.EXAMS:
      return examRoutes;
    case modules.MAIN:
      return mainPanelRoutes;
    default:
      return mainRoute;
  }
}

export const panelRoutes = switchRoute();
