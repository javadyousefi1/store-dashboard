import { getAllTopics } from "@/api/book";
import { createTree, updateTreeWithFile, createTopicWithFile } from "@/api/tree";
import { Button, Form, Input, Select } from "antd";
import TextArea from "global/antd-kit/input/TextArea";
import useFetch from "global/hooks/useFetch";
import Upload from "global/antd-kit/upload/Upload";
import MuiDatePicker from "global/shared/inputs/DatePicker";
import {
  convertIsoStringToTimeStmap,
  convertTimeStmapToIsoString,
} from "global/utils/helpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddBook = ({
  item,
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

  console.log(item)

  useEffect(() => {
    if (rowData) {
      form.setFieldsValue({
        files: [
          {
            uid: `-${item?.id}`,
            name: item?.filePath,
            status: "done",
            url: item?.filePath,
          },
        ],
      });
    }
  }, [item]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishCreate = (values) => {
    const formData = new FormData();
    console.log(item)
    formData.append("ParentId", parentId);
    formData.append("Title", values.title);
    formData.append("Text", values.text);
    formData.append("Type", type);
    formData.append("EditingDate",convertTimeStmapToIsoString(values.editingDate));
    formData.append("File.File", values.files[0]?.originFileObj);
    setLoading(true);

    const loading = toast.loading("در حال ثبت شاخه جدید");
    createTopicWithFile(formData)
      .then((res) => {
        toast.success("شاخه جدید با موفقیت ثبت شد");
        hideModal();
        form.resetFields();
        handleRefreshTable();
      })
      .catch((err) => {
        toast.error(err?.message ?? "ثبت شاخه جدید با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  const onFinishUpdate = (values) => {
    const formData = new FormData();
    formData.append("Id", item?.id);
    formData.append("Title", values.title);
    formData.append("EditingDate",convertTimeStmapToIsoString(values.editingDate));
    // formData.append("Text", values.text);
    if (values.files[0]?.originFileObj) {
      formData.append("File.File", values.files[0]?.originFileObj);
    } else {
      formData.append("File.Path", values.files[0]?.url);
    }
    setLoading(true);

    const loading = toast.loading("در حال ویرایش شاخه جدید");

    updateTreeWithFile(formData)
      .then(() => {
        toast.success("شاخه جدید با موفقیت ویرایش شد");
        hideModal();
        handleRefreshTable();
        form.resetFields();
      })
      .catch((err) => {
        toast.error(err?.message ?? "ویرایش شاخه جدید با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };


  // const onFinishUpdate = (values) => {
  //   const hi = convertIsoStringToTimeStmap(values.editingDate)
  //   const payload = {
  //     // ...values,
  //     File: {
  //       Path: values.files[0]?.url,
  //     },
  //     editingDate: hi,
  //     text: values.text,
  //     type: type,
  //     id: rowData?.id,
  //     title: values.title
  //   };
  //   setLoading(true);

  //   const loading = toast.loading("در حال ویرایش شاخه جدید");

  //   updateTreeWithFile(payload)
  //     .then(() => {
  //       toast.success("شاخه جدید با موفقیت ویرایش شد");
  //       hideModal();
  //       handleRefreshTable();
  //       form.resetFields();
  //     })
  //     .catch((err) => {
  //       toast.error(err?.message ?? "ویرایش شاخه جدید با خطا مواجه شد");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //       toast.dismiss(loading);
  //     });
  // };


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
                editingDate: convertIsoStringToTimeStmap(rowData?.editDate),
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

        <Form.Item
          label="تاریخ ویرایش"
          name="editingDate"
          rules={[
            { required: true, message: "لطفا تاریخ ویرایش را وارد نمایید" },
          ]}
          className="w-full"
        >
          <MuiDatePicker style={{}} label="" name="" onChange={() => {}} />
        </Form.Item>

        {/* <Form.Item
          label="توضیحات"
          name="text"
          rules={[{ required: false, message: "لطفا آدرس را وارد کنید" }]}
        >
          <TextArea />
        </Form.Item> */}

      
        <Form.Item
          label="فایل"
          name="files"
          className="col-span-2"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "افزودن فایل اجباری است" }]}
        >
          <Upload
            // onChange={handleUploadChange}
            name="file"
            accept=".pdf"
            maxCount={1}
            beforeUpload={() => {
              return false;
            }}
            listType="picture-card"
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <svg
                className="m-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#767676"
                  d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
                />
                <path
                  fill="#767676"
                  fill-rule="evenodd"
                  d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
                  clip-rule="evenodd"
                />
              </svg>
              <div style={{ marginTop: 8 }}>افزودن</div>
            </button>
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

export default AddBook;
