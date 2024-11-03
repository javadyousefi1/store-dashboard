import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const PanelLayout = () => {
    return (
        <section className="flex justify-between h-screen">
            <div className="flex-1 h-full">
                <Sidebar />
            </div>
            <div className="w-full bg-color-bg p-8">
                <Outlet />
            </div>
        </section>
    );
}

export default PanelLayout;