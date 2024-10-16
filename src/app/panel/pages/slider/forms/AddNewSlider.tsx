import React, { useEffect, useState } from "react";
import { Form, Button, Input, Switch, Upload } from "antd";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { createSlider, updateSlider } from "@/api/slider";
import toast from "react-hot-toast";

interface SliderFormType {
  title: string;
  link: string;
  banner: string;
  isActive: boolean;
}

interface RowData {
  createData: string;
  id: number;
  imagePath: string;
  isActive: boolean;
  link: string | null;
  title: string;
  userId: string;
}

const AddNewSlider: React.FC<{
  handleRefreshTable: () => void;
  hideModal: () => void;
  rowData?: RowData | null;
}> = ({ handleRefreshTable, hideModal, rowData }) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinishCreate = async (values: SliderFormType) => {
    setLoading(true);
    const loadingToast = toast.loading("در حال ثبت اسلایدر جدید");

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("link", values.link);
    formData.append("Banner", values.banner[0]?.originFileObj);
    formData.append("isActive", values.isActive.toString());

    try {
      await createSlider(formData);
      toast.dismiss(loadingToast);
      toast.success("اسلایدر با موفقیت اضافه شد");
      handleRefreshTable();
      hideModal();
    } catch (err) {
      setLoading(false);
      toast.dismiss(loadingToast);
      toast.error(err?.message || "ثبت اسلایدر با خطا مواجه شد");
    }
  };

  const onFinishUpdate = (data: SliderFormType) => {
    setLoading(true);

    const loadingToast = toast.loading("در حال ویرایش اسلایدر جدید");

    const formData = new FormData();
    formData.append("Id", rowData.id);
    formData.append("title", data.title);
    formData.append("link", data.link);

    if (data?.banner[0]?.originFileObj) {
      formData.append("Banner.File", data?.banner[0]?.originFileObj);
    } else {
      formData.append("Banner.Path", rowData?.imagePath);
    }

    formData.append("isActive", data.isActive.toString());

    updateSlider(formData)
      .then((res) => {
        toast.dismiss(loadingToast);
        toast.success("اسلایدر با موفقیت ویرایش شد");
        handleRefreshTable();
        hideModal();
      })
      .catch((err) => {
        setLoading(false);
        toast.dismiss(loadingToast);
        toast.error(err?.message || "ویرایش اسلایدر با خطا مواجه شد");
      })
      .finally(() => setLoading(false));
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  console.log("rowData", rowData);

  useEffect(() => {
    form.setFieldsValue({
      isActive: rowData?.isActive ? rowData?.isActive : false,
      title: rowData?.title ?? "",
      link: rowData?.link ?? "",
      banner: rowData?.imagePath && [
        {
          uid: `-${rowData?.id}`,
          // name: rowData?.imagePath.split("/").pop(), // Extract file name from path
          name: "عکس", // Extract file name from path
          status: "done",
          url: rowData?.imagePath,
        },
      ],
    });
  }, [form]);

  return (
    <Form
      form={form}
      onFinish={rowData ? onFinishUpdate : onFinishCreate}
      layout="vertical"
      // initialValues={{
      //   isActive: rowData?.isActive ? rowData?.isActive : false,
      //   title: rowData?.title ?? "",
      //   link: rowData?.link ?? "",
      //   banner: rowData?.imagePath && [
      //     {
      //       uid: "-1",
      //       name: rowData?.imagePath.split("/").pop(), // Extract file name from path
      //       status: "done",
      //       url: rowData?.imagePath,
      //     },
      //   ],
      // }}
    >
      <Form.Item
        label="عنوان"
        name="title"
        rules={[{ required: true, message: "وارد کردن عنوان الزامی است" }]}
      >
        <Input placeholder="عنوان" />
      </Form.Item>
      <Form.Item
        label="لینک بنر"
        name="link"
        rules={[{ required: false, message: "" }]}
      >
        <Input placeholder="لینک بنر" />
      </Form.Item>
      <Form.Item label="وضعیت" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        label="عکس اسلایدر"
        name="banner"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "عکس اسلایدر الزامی است" }]}
      >
        <Upload
          beforeUpload={() => {
            return false
          }}
          maxCount={1}
          accept="image/png,image/jpeg"
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>بارگذاری بنر</Button>
        </Upload>
      </Form.Item>
        <div className="flex mt-3 gap-x-2">
          <QuestionCircleOutlined style={{ color: "var(--color-primary)" }} />
          <span>راهنما</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">سایز ایده آل برای عکس اسلایدر ( 440 * 1536) می باشد</p>
      <div className="flex justify-end w-full gap-x-4">
        <Button onClick={hideModal}>انصراف</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="px-8"
        >
          ثبت
        </Button>
      </div>
    </Form>
  );
};

export default AddNewSlider;
