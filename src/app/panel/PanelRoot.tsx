import { useState } from "react";
// layout
import PanelLayout from "../../layout/PanelLayout";
import SidebarHeader from "./pages/home/SidebarHeader";
import { mainPanelList } from "./menus";

const PanelRoot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleSetCollapsed = (status: boolean) => setCollapsed(status);


  const sidebarHeaderCmp = <SidebarHeader collapsed={collapsed} />;



  return (
    <div>
      <PanelLayout
        menuList={mainPanelList}
        sidebarHeader={sidebarHeaderCmp}
        handleSetCollapsed={handleSetCollapsed}
      />
    </div>
  );
};

export default PanelRoot;
