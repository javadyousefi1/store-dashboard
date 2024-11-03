import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const PanelLayout = () => {
    return (
        <section className="h-screen">
            <div className="flex-1 h-full inline-block">
                <Sidebar />
            </div>
            <div className="w-[calc(100vw-218px)] bg-color-bg p-8 h-full inline-block">
                <Outlet />
            </div>
        </section>
    );
}

export default PanelLayout;