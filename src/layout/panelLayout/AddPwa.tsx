import IconifyComp from "@/components/shared/IconifyComp"

const AddPwa = () => {
    return <div className="mb-8 flex flex-col justify-center">
        <img src="/assets/images/dashboard.png" className="hidden md:block" />
        <div className="flex justify-center relative md:-top-14 z-10">
            <button className="bg-[#5dcddf] text-white  py-2 rounded-lg w-[120px] text-sm">
                <div className="md:hidden">
                    <IconifyComp icon={"download"} size="3xl" />
                </div>
                Install App
            </button>
        </div>
    </div>
}

export default AddPwa