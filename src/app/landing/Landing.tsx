// rrrd
import { Outlet } from "react-router-dom";
// ui kit
import LandingLayout from "global/layout/PanelLayout";
// layoyut component
import Header from "./Header";
import Footer from "./Footer";

const Landing = () => {
  return (
    <LandingLayout Header={Header} Footer={Footer}>
      <div className="mt-16 md:mt-20">
        <Outlet />
      </div>
    </LandingLayout>
  );
};

export default Landing;
