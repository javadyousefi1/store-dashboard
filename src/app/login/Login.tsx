import React from "react";
import logoMRUD from "@/assets/images/logoMRUD.png";
import RegularInput from "@/components/shared/input/RegularInput";
import ReactHookFormRegularInput from "@/components/shared/input/ReactHookFormRegularInput";
import PasswordInput from "@/components/shared/input/PasswordInput";
import ButtonCTA from "@/components/shared/button/Button";
import { Link } from "react-router-dom";
import { getCaptcha } from "@/api/authenticate";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ReactHookFormPasswordInput from "@/components/shared/input/ReactHookFormPasswordInput";
import SubmitButton from "@/components/shared/button/SubmitButton";
import { logInValidation } from "@/lib/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInterface } from "@/interfaces/signup";
import Skeleton from "global/antd-kit/skeleton";
import useFetch from "global/hooks/useFetch";

const Login: React.FC = () => {
  const { data, loading, error } = useFetch(getCaptcha);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInterface>({
    defaultValues: {
      userName: "",
      password: "",
    },
    resolver: yupResolver(logInValidation),
    mode: "all",
  });

  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log(data)
  // }

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <Link to="/">
          <img className="w-40" src={logoMRUD} />
        </Link>

        <ReactHookFormRegularInput
          errors={errors}
          validationType="text"
          control={control}
          name="userName"
          label="نام کاربری"
        />

        <div className="flex flex-col w-full gap-2">
          {/* <PasswordInput label="رمز عبور" /> */}
          <ReactHookFormPasswordInput
            errors={errors}
            control={control}
            label="رمز عبور"
            name="password"
          />
          <Link className="underline text-primary" to="">
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>
        </div>

        <div className="flex items-end w-full gap-2">
          <ReactHookFormRegularInput
            errors={errors}
            validationType="text"
            control={control}
            name="captcha"
            label="کد امنیتی"
          />
          {
            loading ? 
            <div className="block w-16 h-10 md:w-24">
            <Skeleton.Image className="!w-full !h-full" active />
          </div>
          :
          <img
          className="rounded-lg"
          src={`data:image/png;base64,${data?.dntCaptchaImage}`}
          alt="captcha"
        />
          }
        </div>

        <SubmitButton disabled={!isValid} label="ثبت" />

        <div>
          <p className="text-xs">
            حساب کاربری ندارید؟
            <Link
              className="text-base font-semibold underline text-primary"
              to="/user/signup"
            >
              ثبت نام
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
export default Login;
