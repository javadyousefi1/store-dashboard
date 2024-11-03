import IconifyComp from "@/components/shared/IconifyComp"
import { IconType } from "@/types/icon"
import { Link } from "react-router-dom"

interface IMeunTabs {
    title: string,
    route: string,
    icon: IconType,
    inRoute?: boolean
}

const MenuTabs: React.FC<IMeunTabs> = ({ title, icon, inRoute, route }) => {
    return <Link to={route} className="h-[48px] flex justify-start items-center gap-x-2 w-full">


        <div className={` flex justify-center items-center h-full  w-[53px] backdrop-blur-lg relative`}>
            <IconifyComp color={`${inRoute ? "var(--color-primary)" : "#9a9aa9"}`} icon={icon} size="3xl" />
            <div className={`${inRoute ? "test" : ""}`}></div>
        </div>

        <p className={`relative top-[1px] font-semibold ${inRoute ? "var(--color-primary)" : "#9a9aa9"}`}>{title}</p>

    </Link>
}


export default MenuTabs