import React from "react";
import LoginImg from "../../assets/images/auth/login.png"
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
const Login: React.FC = () => {



  return (
    <main className="flex w-full h-full">

      <section className="bg-white w-full lg:w-[40%] flex justify-center items-center flex-col">
        <LoginHeader />
        <LoginForm />
      </section>

      <section className=" items-center justify-center w-full h-full bg-[#fafafa] lg:flex hidden">
        <img src={LoginImg} alt="login-img" className="lg:w-[500px] w-[300px] lg:w-[800px]" />
      </section>
    </main>
  );
};
export default Login;
