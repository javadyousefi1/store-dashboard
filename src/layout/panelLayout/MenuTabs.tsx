import { motion, AnimatePresence } from "framer-motion";
import IconifyComp from "@/components/shared/IconifyComp";
import { IconType } from "@/types/icon";
import { Link } from "react-router-dom";
import { memo } from "react";

interface IMeunTabs {
    title: string;
    route: string;
    icon: IconType;
    inRoute?: boolean;
}

const MenuTabs: React.FC<IMeunTabs> = ({ title, icon, inRoute, route }) => {
    return (
        <Link to={route} className="h-[48px] flex justify-center md:justify-start items-center gap-x-2 w-full">
            <div className="flex justify-center items-center h-full w-[53px] backdrop-blur-lg relative">
                <div
                    className={`flex justify-center items-center ${inRoute ? "var(--color-primary)" : "#9a9aa9"}`}
                >
                    <IconifyComp className="transition linear duration-300" color={inRoute ? "var(--color-primary)" : "#9a9aa9"} icon={icon} size="3xl" />
                </div>
                <div className={` absolute hidden md:block  h-full w-[48px] transition linear duration-300 test ${inRoute ? "opacity-40" : "opacity-0"}`}></div>
            </div>
            <p
                key="inactive-title"
                className={`relative hidden md:block top-[1px] font-semibold transition linear duration-300 ${inRoute ? "text-primary" : "text-[#9a9aa9]"}`}
            >
                {title}
            </p>

        </Link>
    );
};

export default memo(MenuTabs);
