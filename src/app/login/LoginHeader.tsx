import Logo from "../../assets/images/logo/logo.png"
const LoginHeader = () => {
    return (<div className="flex flex-col items-center justify-center">
        <img alt="logo" src={Logo} className="size-[92px]" />
        <h1 className="mt-10 text-2xl font-bold">Log in</h1>
    </div>);
}

export default LoginHeader;