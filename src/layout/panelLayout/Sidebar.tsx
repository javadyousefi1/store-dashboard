import { useLocation } from "react-router-dom";
import Header from "./Header"
import MenuTabs from "./MenuTabs";
import { IconType } from "@/types/icon";

interface nav {
    title: string,
    route: string,
    iconName: IconType
}

const Sidebar = () => {

    const { pathname } = useLocation()


    const navList: nav[] = [
        { title: "Dashborad", route: "/", iconName: "dashboard" },
        { title: "Users", route: "/users", iconName: "users" },
    ]

    return (
        <aside className="w-[218px] bg-white h-full">
            <Header />
            {navList.map((item, index) => <MenuTabs route={item.route} key={`${index}-${item.title}`} title={item.title} icon={item.iconName} inRoute={item.route === pathname} />)}
        </aside>);
}

export default Sidebar;