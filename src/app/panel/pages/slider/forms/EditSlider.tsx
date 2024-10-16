import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "global/antd-kit/button";
import Input from "global/antd-kit/input";
import Switch from "global/antd-kit/switch";
import Checkbox from "global/antd-kit/checkbox";
import { sliderFormSchema } from "@/validator/yup";
import { getAllSliderById, updateSlider } from "@/api/slider";
import toast from "react-hot-toast";
import Spin from "global/antd-kit/spin";

const { Dragger } = Upload;

interface SliderFormType {
  title: string;
  link: string;
  banner: string;
  isActive: boolean;
}

const EditSlider: React.FC<{
  handleRefreshTable: () => void;
  hideModal: () => void;
  rowData: any;
}> = ({ handleRefreshTable, hideModal, rowData }) => {
  const [bannerFile, setBannerFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mountingLoading, setMountingLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(true);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<SliderFormType>({
    defaultValues: {
      title: "",
      link: "",
      banner: "",
      isActive: false,
    },
    resolver: yupResolver(sliderFormSchema),
  });
  const t = getValues("banner");
  console.log(t);

  useEffect(() => {
    setMountingLoading(true);
    const fetchSliderData = async () => {
      try {
        console.log("Fetching slider data...");
        const res = await getAllSliderById({ id: rowData.id });
        console.log("Slider data received:", res.data);
        setValue("title", res.data.title);
        setValue("link", res.data.link);
        setValue("isActive", res.data.isActive);
        setMountingLoading(false);

        if (res.data.imagePath) {
          setBannerFile([
            {
              uid: "-1",
              name: "", // Extract file name from path
              status: "done",
              url: res.data.imagePath,
            },
          ]);
          setValue("banner", res.data.imagePath);
        }
      } catch (err) {
        console.log(err);
        toast.error("دریافت اطلاعات اسلایدر با خطا مواجه شد");
      }
      finally {
        setMountingLoading(false);
      }
    };

    fetchSliderData();
  }, [rowData.id]);

  const onsubmit = (data: SliderFormType) => {
    console.log("Form submitted:", data);
    setLoading(true);

    const loadingToast = toast.loading("در حال ثبت اسلایدر جدید");

    const formData = new FormData();
    formData.append("Id", rowData.id);
    formData.append("title", data.title);
    formData.append("link", data.link);

    if (data.banner?.startsWith("http")) {
      formData.append("Banner.Path", data.banner);
    } else {
      formData.append("Banner.File", bannerFile[0].originFileObj);
    }

    formData.append("isActive", data.isActive.toString());

    updateSlider(formData)
      .then((res) => {
        toast.dismiss(loadingToast);
        toast.success("اسلایدر با موفقیت ویرایش شد");
        handleRefreshTable();
        hideModal();
        handleResetForm();
      })
      .catch((err) => {
        setLoading(false);
        toast.dismiss(loadingToast);
        toast.error(err?.message || "ثبت اسلایدر با خطا مواجه شد");
      })
      .finally(() => setLoading(false));
  };

  const handleChangeBanner = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.slice(-1); // Keep only the last uploaded file

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setBannerFile(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0];
      setValue("banner", String(file.name));
    } else {
      setValue("banner", "");
    }
  };

  const handleResetForm = () => {
    reset();
    setBannerFile([]);
  };

  return !mountingLoading ? ( 
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* checkbox */}
        <div className="flex justify-end col-span-2">
          <Checkbox
            className="mb-2"
            onChange={(e) => setCheckBox(e.target.checked)}
            checked={checkBox}
          >
            بنر به خبر لینک شود
          </Checkbox>
        </div>
        {/* title */}
        <div>
          <label>عنوان</label>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                className={
                  fieldState.invalid ? "custom-input error" : "custom-input"
                }
              />
            )}
          />
        </div>
        {/* link */}
        <div>
          <label>لینک بنر</label>
          <Controller
            name="link"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                disabled={!checkBox}
                className={
                  fieldState.invalid ? "custom-input error" : "custom-input"
                }
              />
            )}
          />
        </div>
        {/* isActive */}
        <div className="flex flex-col gap-y-2">
          <label>وضعیت</label>
          <Controller
            name="isActive"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex justify-start gap-x-8">
                <Switch
                  id="isActive"
                  onChange={onChange}
                  checked={value}
                  className="w-[50px]"
                />
                <label htmlFor="isActive">{value ? "فعال" : "غیر فعال"}</label>
              </div>
            )}
          />
        </div>
        {/* uploader */}
        <div className="col-span-2">
          <label>عکس بنر</label>
          <Controller
            name="banner"
            control={control}
            render={({ field }) => (
              <Dragger
                onChange={(e) => {
                  handleChangeBanner(e);
                }}
                fileList={bannerFile}
                maxCount={1}
                beforeUpload={() => false}
                name={field.name}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">آپلود اسلایدر</p>
                <p className="ant-upload-hint">
                  عکس اسلایدر مورد نظر خود را در این مکان بکشید و رها کنید
                </p>
              </Dragger>
            )}
          />
        </div>
        <div className="flex justify-end col-span-2 mt-10 gap-x-4">
          <Button onClick={hideModal} disabled={loading}>
            انصراف
          </Button>
          <Button
            htmlType="submit"
            className="px-8"
            disabled={!isValid || bannerFile.length === 0 || loading}
          >
            ثبت
          </Button>
        </div>
      </div>
    </form>
  ) :
  <div className="flex justify-center items-center">
  <Spin />
  </div>
};

export default EditSlider;
