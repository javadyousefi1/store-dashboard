import React, { useState } from "react";
// api
import { createNewRssLink, updateRssLink } from "@/api/rssLink";
// interface
import { RssLinkObject } from "@/interfaces";
// component
import Button from "global/antd-kit/button";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
// toast
import toast from "react-hot-toast";

type FieldType = {
  title: string;
  link: string;
};

const RssLinkForm: React.FC<{
  handleRefreshTable: () => void;
  hideModal: () => void;
  rowData: RssLinkObject;
}> = ({ handleRefreshTable, hideModal, rowData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();


  const onFinishCreate = (values: FieldType) => {
    setLoading(true);

    const loading = toast.loading("در حال ثبت RSS link جدید");

    createNewRssLink(values)
      .then(() => {
        toast.success("ثبت لینک RSS جدید با موفقیت انجام شد");
        handleRefreshTable();
        hideModal();
        form.resetFields()
      })
      .catch((err) => {
        toast.error(err?.message ?? "ثبت RSS link جدید با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  const onFinishUpdate = (values: FieldType) => {
    setLoading(true);

    const loading = toast.loading("در حال ویرایش RSS link ...");

    updateRssLink({ ...values, id: rowData.id ?? 0 })
      .then(() => {
        toast.success("ویرایش لینک RSS با موفقیت انجام شد");
        handleRefreshTable();
        hideModal();
      })
      .catch((err) => {
        toast.error(err?.message ?? "ویرایش RSS link با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  return (
    <Form
      name="RSS-link"
      form={form}
      style={{ maxWidth: 600, marginTop: "20px" }}
      onFinish={rowData ? onFinishUpdate : onFinishCreate}
      layout="vertical"
      initialValues={{
        title: rowData?.title,
        link: rowData?.link,
      }}
    >
      <Form.Item<FieldType>
        label="عنوان"
        name="title"
        rules={[{ required: true, message: "لطفا عنوان را وارد کنید" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="آدرس"
        name="link"
        rules={[{ required: true, message: "لطفا آدرس را وارد کنید" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-end gap-4">
        <Button onClick={hideModal} >
        انصراف
          </Button>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="px-8"
          >
            ثبت
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RssLinkForm;
