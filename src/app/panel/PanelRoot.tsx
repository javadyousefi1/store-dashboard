import { useState } from "react";
// layout
import SidebarHeader from "./pages/home/SidebarHeader";
import PanelLayout from "@/layout/panelLayout/PanelLayout";

const PanelRoot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleSetCollapsed = (status: boolean) => setCollapsed(status);


  const sidebarHeaderCmp = <SidebarHeader collapsed={collapsed} />;



  return (
    <PanelLayout />
  );
};

export default PanelRoot;
