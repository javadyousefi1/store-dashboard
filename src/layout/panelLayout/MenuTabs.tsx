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
        <Link to={route} className="h-[48px] flex justify-start items-center gap-x-2 w-full">
            <div className="flex justify-center items-center h-full w-[53px] backdrop-blur-lg relative">
                <motion.div
                    initial={{ color: "#9a9aa9" }}
                    animate={{ color: inRoute ? "var(--color-primary)" : "#9a9aa9" }}
                    transition={{ duration: 0.3 }}
                    style={{ color: inRoute ? "var(--color-primary)" : "#9a9aa9" }}
                >
                    <IconifyComp color={inRoute ? "var(--color-primary)" : "#9a9aa9"} icon={icon} size="3xl" />
                </motion.div>
                <div className={`${inRoute ? "test" : ""}`}></div>
            </div>

            {/* Title text with conditional rendering and animation */}
            <AnimatePresence mode="wait">
                {inRoute ? (
                    <motion.p
                        key="active-title"
                        className="relative top-[1px] font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, color: "var(--color-primary)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {title}
                    </motion.p>
                ) : (
                    <motion.p
                        key="inactive-title"
                        className="relative top-[1px] font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, color: "#9a9aa9" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {title}
                    </motion.p>
                )}
            </AnimatePresence>
        </Link>
    );
};

export default memo(MenuTabs);
