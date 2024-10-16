// antd
import { Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// global features
import Button from "global/antd-kit/button";
import TextArea from "global/antd-kit/input/TextArea";
import Switch from "global/antd-kit/switch";
import useFetch from "global/hooks/useFetch";
// react
import { useState } from "react";
// react-hot-toast
import toast from "react-hot-toast";
// api
import { apiAddExamItems, apiupdateExamItems } from "@/api/examItems";
import { apiGetAllExams } from "@/api/exam";

const TestItemsForm = ({ hideModal, handleRefreshTable, rowData }) => {


  const fakeList = [
    { label: "نمونه سوالات", value: "نمونه سوالات" },
    { label: "پاسخنامه تشریحی", value: "پاسخنامه تشریحی" },

  ];
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { data: allExam, loading: optionsLoading } =
    useFetch(apiGetAllExams);
  const options = allExam?.data?.items;

  function onFinishCreate(values) {
    const formData = new FormData();
    formData.append("examId", values.examId);
    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive);
    formData.append("examEnum", 3);
    formData.append("url", values.url ?? "");

    formData.append("file", values.file[0]?.originFileObj);
    setLoading(true);
    const loading = toast.loading("در حال ثبت");
    apiAddExamItems(formData)
      .then((res) => {
        toast.success("مواد آزمون جدید ثبت شد.");
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
  }

  function onFinishUpdate(values) {
    const formData = new FormData();
    formData.append("id", rowData.id);
    formData.append("examId", values.examId);
    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive);
    formData.append("url", values.url ?? "");
    formData.append("examEnum", 3);

    if (values?.file[0]?.originFileObj) {
      formData.append("File.File", values?.file[0]?.originFileObj);
    } else {
      formData.append("File.Path", rowData?.imagePath);
    }

    setLoading(true);
    const loading = toast.loading("در حال ویرایش مواد آزمون");
    apiupdateExamItems(formData)
      .then(() => {
        toast.success(`مواد آزمون ${rowData.title} ویرایش شد.`);
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
  }

  function normFile(e: any) {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

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
              description: rowData?.description,
              isActive: rowData?.isActive,
              examEnum: rowData?.examEnum,
              examId: rowData?.examId,
              file: rowData?.filePath && [
                {
                  uid: `-${rowData?.id}`,
                  name: "فایل", // Extract file name from path
                  status: "done",
                  url: rowData?.filePath,
                },
              ],
            }
            : { isActive: false }
        }
      >
        {/* exam */}
        <Form.Item
          label="انتخاب آزمون"
          name="examId"
          rules={[
            { required: true, message: "آزمون مورد نظر خود را وارد کنید" },
          ]}
        >
          <Select
            fieldNames={{ label: "title", value: "id" }}
            loading={optionsLoading}
            options={options}
            defaultValue="انتخاب کنید"
            className="w-full"
          />
        </Form.Item>
        {/* fake */}
        <Form.Item
          label="نوع"
          name="fake"
          rules={[
            { required: true, message: "آزمون مورد نظر خود را وارد کنید" },
          ]}
        >
          <Select
            options={fakeList}
            defaultValue="انتخاب کنید"
            className="w-full"
          />
        </Form.Item>
        {/* title */}
        <Form.Item
          label="عنوان"
          name="title"
          rules={[{ required: true, message: "لطفا عنوان را وارد کنید" }]}
        >
          <Input />
        </Form.Item>

        {/* url */}
        {/* <Form.Item
          label="لینک به"
          name="url"
          rules={[{ required: false, message: "لطفا توضیحات را وارد کنید" }]}
        >
          <Input />
        </Form.Item> */}


        {/* decription */}
        <Form.Item
          label="توضیحات"
          name="description"
          rules={[{ required: false, message: "لطفا توضیحات را وارد کنید" }]}
        >
          <TextArea />
        </Form.Item>

        {/* isActive */}
        <Form.Item label="وضعیت" name="isActive" valuePropName="checked">
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
        </Form.Item>
        {/* upload */}
        <Form.Item
          label="فایل آزمون"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "قایل آزمون الزامی است" }]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            maxCount={1}
            accept="pdf"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>بارگذاری آزمون</Button>
          </Upload>
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

export default TestItemsForm;
