import { getAllTopics } from "@/api/book";
import {
  createTree,
  createTreeWithFile,
  updateTree,
  updateTreeWithFile,
} from "@/api/tree";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload } from "antd";
import TextArea from "global/antd-kit/input/TextArea";
import Button from "global/antd-kit/button";
import useFetch from "global/hooks/useFetch";
import { useState } from "react";
import toast from "react-hot-toast";

const AddBookWithFile = ({
  hideModal,
  handleRefreshTable,
  rowData,
  type = 1,
  parentId = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // const { data, loading: optionsLoading } = useFetch(getAllTopics);

  // const options = data?.data?.map((item) => ({
  //   label: item.title,
  //   value: item.id,
  // }));

  const onFinishCreate = (values) => {
    setLoading(true);
    // const payload = {
    //   ...values,
    //   parentId: parentId,
    //   type: type,
    //   number: "0",
    // };

    const formData = new FormData();

    formData.append("ParentId", parentId ?? "");
    formData.append("type", type);
    formData.append("Title", values.title);
    formData.append("Text", values.text ?? "");
    formData.append("number", "0");
    formData.append("File.File", values.file[0]?.originFileObj);

    let message = !parentId ?"کتاب جدید ثبت شد":"شاخه جدید ثبت شد"

    const loading = toast.loading("در حال ثبت  ");
    createTreeWithFile(formData)
      .then((res) => {
        toast.success(message);
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
    const formData = new FormData();

    formData.append("id", rowData?.id);
    formData.append("ParentId", parentId ?? "");
    formData.append("type", type);
    formData.append("Title", values.title);
    formData.append("Text", values.text ?? "");
    formData.append("number", "0");

    if (values?.file[0]?.originFileObj) {
      formData.append("File.File", values?.file[0]?.originFileObj);
    } else {
      formData.append("File.Path", rowData?.imagePath);
    }

    setLoading(true);
    let message = !parentId ?"کتاب جدید ثبت شد":"شاخه جدید ثبت شد"

    const loading = toast.loading("در حال ویرایش شاخه جدید");

    updateTreeWithFile(formData)
      .then(() => {
        toast.success(message);
        hideModal();
        handleRefreshTable();
        form.resetFields();
      })
      .catch((err) => {
        toast.error(err?.message ??"عملیات با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
                title:
                  typeof rowData?.title === "string"
                    ? rowData?.title
                    : rowData?.mainTitle,
                type: rowData?.type + "",
                text: rowData?.text,
                file: rowData?.filePath && [
                  {
                    uid: `-${rowData?.id}`,
                    // name: rowData?.filePath.split("/").pop(), // Extract file name from path
                    name: "عکس", // Extract file name from path
                    status: "done",
                    url: rowData?.filePath,
                  },
                ],
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

        {/* <Form.Item
          label="نوع"
          name="type"
          rules={[{ required: true, message: "لطفا آدرس را وارد کنید" }]}
        >
          <Select options={options} loading={optionsLoading} />
        </Form.Item> */}

        {/* <Form.Item
          label="توضیحات"
          name="text"
          rules={[{ required: false, message: "لطفا توضیحات را وارد کنید" }]}
        >
          <TextArea />
        </Form.Item> */}

        <Form.Item
          label="عکس کتاب"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "عکس کتاب الزامی است" }]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            maxCount={1}
            accept="image/png,image/jpeg"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>بارگذاری بنر</Button>
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

export default AddBookWithFile;
