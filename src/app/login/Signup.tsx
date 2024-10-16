import React, { useEffect, useState } from "react";
import logoMRUD from "@/assets/images/logoMRUD.png";
import RegularInput from "@/components/shared/input/RegularInput";
import ReactHookFormRegularInput from "@/components/shared/input/ReactHookFormRegularInput";
import SubmitButton from "@/components/shared/button/SubmitButton";
import { Link } from "react-router-dom";
import { getCaptcha } from "@/api/authenticate";
import { useForm, Controller } from "react-hook-form";
import { SignupInterface } from "@/interfaces/signup";
import { generateExternalUserRegisterOTPWithCaptcha } from "@/api/authenticate";
import DatePicker from "global/shared/inputs/DatePicker";
import { timestampToPersianDate } from "global/utils/helpers";
import { convertPersianDigitsToEnglish } from "global/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidation } from "@/lib/yupSchema";
import toast from "react-hot-toast";
import Tooltip from "global/antd-kit/tooltip";
import Skeleton from "global/antd-kit/skeleton";
import useFetch from "global/hooks/useFetch";

const Signup: React.FC = () => {
  const [birthDate, setBirthDate] = useState("");
  const [imageCaptcha, setImageCaptcha] = useState("");
  const [dntCaptchaText, setDntCaptchaText] = useState("");
  const [dntCaptchaToken, setDntCaptchaToken] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInterface>({
    mode: "all",
    resolver: yupResolver(signUpValidation),
  });

  const { data, loading, error } = useFetch(getCaptcha);

  useEffect(() => {
    setImageCaptcha(data?.dntCaptchaImage);
    setDntCaptchaText(data?.dntCaptchaText);
    setDntCaptchaToken(data?.dntCaptchaToken);
  }, [data]);

  const updatedCaptcha = () => {
    getCaptcha()
      .then((res) => {
        setImageCaptcha(res?.dntCaptchaImage);
      })
      .catch((error) => {
        alert("خطا در دریافت کد امنیتی");
      });
  };

  const timeStampToPersian = timestampToPersianDate(birthDate);
  const convertToEnglishDigit =
    convertPersianDigitsToEnglish(timeStampToPersian);

  const onSubmit = async (data: SignupInterface) => {
    try {
      const formData = new FormData();
      formData.append("mobile", data.mobile);
      formData.append("nationalCode", data.nationalCode);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("fatherName", data.fatherName);
      // formData.append("birthDate", data.birthDate);
      formData.append("birthDate", convertToEnglishDigit);
      formData.append("dntCaptchaToken", dntCaptchaToken);
      formData.append("dntCaptchaText", dntCaptchaText);
      formData.append("dntCaptchaInputText", data.dntCaptchaInputText);
      const response = await generateExternalUserRegisterOTPWithCaptcha(
        formData
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      if (error) {
        const message = error?.message;
        toast.error(message);
      }
      getCaptcha().then((res) => {
        setImageCaptcha(res?.dntCaptchaImage);
        setDntCaptchaText(res?.dntCaptchaText);
        setDntCaptchaToken(res?.dntCaptchaToken);
      });
      // .catch((err) => console.log(err));
      //   throw new Error("خطا");
    }
  };

  return (
    <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <Link to="/">
          <img className="w-40" src={logoMRUD} />
        </Link>
        <span>ثبت نام</span>
        <ReactHookFormRegularInput
          errors={errors}
          count={{
            show: true,
            max: 11,
            strategy: (txt: string) => txt.length,
            exceedFormatter: (txt: string, { max }: { max: number }) =>
              txt.slice(0, max),
          }}
          validationType="number"
          control={control}
          name="mobile"
          label="شماره همراه"
        />

        <ReactHookFormRegularInput
          errors={errors}
          count={{
            show: true,
            max: 10,
            strategy: (txt: string) => txt.length,
            exceedFormatter: (txt: string, { max }: { max: number }) =>
              txt.slice(0, max),
          }}
          validationType="number"
          control={control}
          name="nationalCode"
          label="کد ملی"
        />

        <ReactHookFormRegularInput
          errors={errors}
          validationType="text"
          control={control}
          name="firstName"
          label="نام"
        />
        <ReactHookFormRegularInput
          errors={errors}
          validationType="text"
          control={control}
          name="lastName"
          label="نام خانوادگی"
        />
        <ReactHookFormRegularInput
          errors={errors}
          validationType="text"
          control={control}
          name="fatherName"
          label="نام پدر"
        />

        <DatePicker
          style={{
            background: "var(--color-gray-light)",
            height: "40px",
            width: "100%",
          }}
          name="birthDate"
          onChange={setBirthDate}
          value={birthDate}
          label="تاریخ تولد"
        />

        <div>
          <div className="flex items-end gap-2">
            <Controller
              control={control}
              name="dntCaptchaInputText"
              render={({ field: { onChange, value, onBlur } }) => (
                <RegularInput
                  name="dntCaptchaInputText"
                  onBlur={onBlur}
                  value={value}
                  errors={errors}
                  validationType="number"
                  onChange={onChange}
                  label="کد امنیتی"
                />
              )}
            />
            {loading ? (
              <div className="block w-24 h-10">
                <Skeleton.Image className="!w-full !h-full" active />
              </div>
            ) : (
              <Tooltip placement="top" title="بازآوری مجدد">
                <img
                  onClick={updatedCaptcha}
                  className="rounded-lg cursor-pointer"
                  src={`data:image/png;base64,${imageCaptcha}`}
                  alt="Captcha"
                />
              </Tooltip>
            )}
          </div>
          {errors && (
            <span className="text-xs text-error-main">
              {errors?.dntCaptchaInputText?.message}
            </span>
          )}
        </div>

        <SubmitButton disabled={!isValid} label="ثبت" />
      </div>
    </form>
  );
};
export default Signup;
