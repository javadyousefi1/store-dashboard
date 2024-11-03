// rrrd
import { Outlet } from "react-router-dom";
// ui kit
import LandingLayout from "../../layout/LandingLayout";
// layoyut component
import Header from "./Header";
import Footer from "./Footer";

const Landing = () => {
  return (
      <div className="mt-16 md:mt-20">
        <Outlet />
      </div>
  );
};

export default Landing;
