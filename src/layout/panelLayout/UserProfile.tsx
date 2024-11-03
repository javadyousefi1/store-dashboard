import IconifyComp from "@/components/shared/IconifyComp"

const UserProfile = () => {
    const user = {
        name: "Easin Arafat",
        role: ["admin"]
    }
    return <div className="w-full  flex justify-start gap-x-4 items-center">
        <img src="/assets/images/userProfile.png" className="w-[40px] h-[40px] rounded-lg object-cover " />
        <div className="hidden md:block">
            <p className="text-sm whitespace-nowrap">{user.name}</p>
            <p className="text-sm text-gray-icon">{user.role[0]}</p>
        </div>

        <div className="flex-1  justify-end hidden md:flex">
            <IconifyComp icon="logout" size="2xl" />
        </div>
    </div>
}

export default UserProfile