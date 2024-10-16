import React, { useState } from "react";
// componetns
import { Form, Button, Switch, Input } from "antd";
// api
import { createWorkPosition } from "@/api/setting";
// toast
import toast from "react-hot-toast";

interface WorkPositionType {
  title: string;
  isActive: boolean;
}

const AddWorkPositionSettingForm: React.FC<{
  handleUpdateEditionVersion: () => void;
  handleCancelAddModal: () => void;
}> = ({ handleUpdateEditionVersion,handleCancelAddModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: WorkPositionType) => {
    const loading = toast.loading("در حال ثبت سمت");
    setLoading(true);
    createWorkPosition(values)
      .then(() => {
        form.resetFields();
        toast.success(" سمت با موفقیت ثبت شد");
        handleUpdateEditionVersion();
      })
      .catch((error) => {
        toast.error(error?.message || "ثبت سمت با خطا مواجه شد");
      })
      .finally(() => {
        toast.dismiss(loading);
        setLoading(false);
      });
  };

  return (
    <div className="w-full mt-3">
      <Form
        initialValues={{
          isActive: false,
        }}
        onFinish={onFinish}
        layout="vertical"
        className="!w-full"
        form={form}
      >
        <Form.Item
          label="عنوان"
          name="title"
          rules={[{ required: true, message: "وارد کردن عنوان اجباری است" }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          label="وضعیت"
          name="isActive"
          valuePropName="checked"
          rules={[{ required: true, message: "انتخاب وضعیت اجباری است" }]}
        >
          <Switch />
        </Form.Item>
        <div className="flex justify-end gap-4">
          <Button onClick={handleCancelAddModal}>انصراف</Button>
          <Form.Item style={{marginBottom: 0}}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-8"
            >
              ثبت
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddWorkPositionSettingForm;
