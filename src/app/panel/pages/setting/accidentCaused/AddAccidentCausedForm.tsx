import React, { useState } from "react";
import toast from "react-hot-toast";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
import Radio from "global/antd-kit/radio/radio";
import Group from "global/antd-kit/radio/group";
import type { FormProps } from "global/antd-kit/form";
import type { RadioChangeEvent } from "global/antd-kit";
import Button from "global/antd-kit/button";
import { createCauseAccident } from "@/api/setting";
import Switch from "global/antd-kit/switch";

const AddAccidentCausedForm: React.FC<{
  handleCancelAddModal: () => void;
  handleUpdateEditionVersion: () => void;
}> = ({ handleCancelAddModal, handleUpdateEditionVersion }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const loadingToast = toast.loading("در حال ثبت علت حادثه");

    try {
      const response = await createCauseAccident(values);
      handleCancelAddModal();
      handleUpdateEditionVersion();
      toast.success("علت حادثه با موفقیت ایجاد شد");
      toast.dismiss(loadingToast);
      form.resetFields();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("ایجاد علت حادثه با خطا مواجه شد");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    title: string;
    isActive: boolean;
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ isActive: true }}
    >
      <Form.Item<FieldType>
        label="عنوان"
        name="title"
        rules={[{ required: true, message: "وارد کردن عنوان اجباری است" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        className="!mb-0"
        name="isActive"
        label="وضعیت"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <div className="flex justify-end gap-4">
      {/* <Form.Item style={{ marginBottom: 0 }}> */}
        <Button onClick={handleCancelAddModal} >
        انصراف
          </Button>
        {/* </Form.Item> */}
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" className="px-8">
            ثبت
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
export default AddAccidentCausedForm;
