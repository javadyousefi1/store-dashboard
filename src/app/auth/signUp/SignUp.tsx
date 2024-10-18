import React from "react";
import SignUpImg from "../../../assets/images/auth/signUp.png"
import SignUpHeader from "./SignUpHeader";
import SignUpForm from "./SignUpForm";
const SignUp: React.FC = () => {



  return (
    <main className="flex w-full h-full">

      <section className="bg-white w-full lg:w-[40%] flex justify-center items-center flex-col">
        <SignUpHeader />
        <SignUpForm />
      </section>

      <section className=" items-center justify-center w-full h-full bg-[#fafafa] lg:flex hidden">
        <img src={SignUpImg} alt="signup-img" className="md:w-[500px] w-[300px] lg:w-[800px]" />
      </section>
    </main>
  );
};
export default SignUp;
