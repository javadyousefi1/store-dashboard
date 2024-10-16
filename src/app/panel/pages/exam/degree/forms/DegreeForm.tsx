import { apiAddDegree, apiupdateDegree } from "@/api/degree";
import { Form, Input } from "antd";
import Button from "global/antd-kit/button";
import Switch from "global/antd-kit/switch";
import { useState } from "react";
import toast from "react-hot-toast";

const DegreeForm = ({ hideModal, handleRefreshTable, rowData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinishCreate = (values) => {
    setLoading(true);
    const loading = toast.loading("در حال ثبت");
    apiAddDegree(values)
      .then((res) => {
        toast.success("مقطع جدید ثبت شد.");
        hideModal();
        form.resetFields();
        handleRefreshTable();
      })
      .catch((err) => {
        toast.error(err?.message ?? "عملیات با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  const onFinishUpdate = (values) => {
    setLoading(true);
    const loading = toast.loading("در حال ویرایش مقطع");
    apiupdateDegree({ ...values, id: rowData.id })
      .then(() => {
        toast.success(`مقطع ${rowData.title} ویرایش شد.`);
        hideModal();
        handleRefreshTable();
        form.resetFields();
      })
      .catch((err) => {
        toast.error(err?.message ?? "عملیات با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  return (
    <>
      <Form
        name="add-child-to-tree"
        form={form}
        style={{ maxWidth: 600, marginTop: "10px" }}
        onFinish={rowData ? onFinishUpdate : onFinishCreate}
        layout="vertical"
        initialValues={
          rowData
            ? {
                title: rowData?.title,
                isActive: rowData?.isActive,
              }
            : {}
        }
      >
        <Form.Item
          label="عنوان"
          name="title"
          rules={[{ required: true, message: "لطفا عنوان را وارد کنید" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="وضعیت" name="isActive" valuePropName="checked">
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
        </Form.Item>
        <div className="flex justify-end gap-4">
          <Button onClick={hideModal}>لغو</Button>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="px-8"
          >
            ثبت
          </Button>
        </div>
      </Form>
    </>
  );
};

export default DegreeForm;
