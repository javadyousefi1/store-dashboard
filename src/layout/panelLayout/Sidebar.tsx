import { useLocation } from "react-router-dom";
import Header from "./Header"
import MenuTabs from "./MenuTabs";
import { IconType } from "@/types/icon";
import UserProfile from "./UserProfile";
import AddPwa from "./AddPwa";

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
        { title: "test", route: "/test", iconName: "users" },
    ]

    return (
        <aside className="w-[80px] md:w-[218px] h-full flex flex-col justify-between">
            <div>
                <Header />
                <div>
                    {navList.map((item, index) => <MenuTabs route={item.route} key={`${index}-${item.title}`} title={item.title} icon={item.iconName} inRoute={item.route === pathname} />)}
                </div>
            </div>
            <div className="pb-7  px-4">
                <AddPwa />
                <UserProfile />
            </div>
        </aside>);
}

export default Sidebar;