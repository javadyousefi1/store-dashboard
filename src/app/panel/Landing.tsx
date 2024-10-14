import { useState } from "react";
// rrd
import { Outlet } from "react-router-dom";
// layout
import PanelLayout from "global/layout/PanelLayout";
import SidebarHeader from "./pages/home/SidebarHeader";
import { accidentsList, examList, mainPanelList } from "./menus";
// enums
import { modules } from "@/enums/modules";
import { mainRoute } from "./routes/routes";
const PanelRoot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleSetCollapsed = (status: boolean) => setCollapsed(status);

  // get query-string
  const querys = window.location.pathname.split("/")[2]
  const menuList = switchRoute();
  const sidebarHeaderCmp = <SidebarHeader collapsed={collapsed} />;

  function switchRoute() {
    switch (querys) {
      case modules.ACCIDENT:
        return accidentsList;
      case modules.EXAMS:
        return examList;
      case modules.MAIN:
        return mainPanelList;
      default:
        return mainRoute;
    }
  }

  return (
    <div>
      <PanelLayout
        menuList={menuList}
        sidebarHeader={sidebarHeaderCmp}
        handleSetCollapsed={handleSetCollapsed}
      />
    </div>
  );
};

export default PanelRoot;
