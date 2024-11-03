import { setting } from "@/setting/setting"
const Header = () => {
    return <div className="pt-[50px] mb-[38px] flex justify-center items-center gap-x-4">
        <img src="/assets/images/logo.png" className="w-[42px] h-[42px]" />
        <h1 className="font-bold text-lg hidden md:block">{setting.projectInfo.name}</h1>
    </div>
}

export default Header