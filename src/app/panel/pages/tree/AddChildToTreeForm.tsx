import { getAllTopics } from "@/api/book";
import { createTree, getTreeById, updateTree } from "@/api/tree";
import CKEditorComponent from "@/components/CKEditor";
import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "global/antd-kit/input/TextArea";
import useFetch from "global/hooks/useFetch";
import MuiDatePicker from "global/shared/inputs/DatePicker";
import {
  convertIsoStringToTimeStmap,
  convertTimeStmapToIsoString,
} from "global/utils/helpers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddChildToTreeForm = ({
  hideModal,
  clickedTree,
  loadMoreData,
  setTreeData,
  isEdit,
  EditTreeHandler,
}) => {
  const querys = window.location.pathname.split("/")[2]

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data, loading: optionsLoading } = useFetch(getAllTopics);
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    form.setFieldValue("text", editorData);
  }, [editorData]);

  // useEffect(() => {
  //   if (isEdit) form.setFieldValue("type", clickedTree?.type);
  // }, [clickedTree]);

  useEffect(() => {
    if (!isEdit) return;

    getTreeById(clickedTree?.id).then(({ data }) => {
      const treeData = data[0];
      form.setFieldValue("title", treeData?.title);
      form.setFieldValue("text", treeData?.text);
      setEditorData(treeData?.text);
      form.setFieldValue("number", treeData?.number);
      form.setFieldValue("type", treeData?.type);
      form.setFieldValue("priority", treeData?.priority);
      // form.setFieldValue(
      //   "editingDate",
      //   convertIsoStringToTimeStmap(treeData?.editingDate)
      // );
    });
  }, [isEdit, clickedTree]);

  const options = data?.data?.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const onFinishCreate = (values) => {
    setLoading(true);
    let payload = {
      ...values,
      editingDate: convertTimeStmapToIsoString(values?.editingDate),
      parentId: clickedTree?.id ?? querys?.parentId ?? undefined,
    };

    if (values.type === 4) {
      payload.title = String(values.text.replace("<p>" , "").replace("</p>" , "").slice(0, 15) + "...");
    }

    if (values.type === 6) {
      payload.text = "";
    }

    const loading = toast.loading("در حال ثبت شاخه جدید");
    createTree(payload)
      .then((res) => {
        toast.success("شاخه جدید با موفقیت ثبت شد");
        hideModal();
        form.resetFields();
        console.log(res , "res")
        // if add from root
        if (clickedTree === null) {
          setTreeData((prev) => [
            ...prev,
            {
              id: res.data.id,
              title: res.data.title,
              text: values.text,
              number: +values.number,
              key: prev.length + 1 + "",
              isLeaf: true,
            },
          ]);
        } else {
          // if add from child
          loadMoreData({ key: clickedTree?.key });
        }
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
    let payload = {
      ...values,
      id: clickedTree?.id ?? null,
      key: clickedTree?.key,
      title: values?.title ? values?.title : values.text.slice(0, 10) + "...",
    };

    if (values.type === 4) {
      payload.title = String(values.text.replaceAll("<p>" , "").replaceAll("</p>" , "").slice(0, 15) + "...");
    }

    if (values.type === 6) {
      payload.text = "";
    }

    setLoading(true);

    const loading = toast.loading("در حال ویرایش شاخه جدید");

    updateTree(payload)
      .then(() => {
        toast.success("شاخه جدید با موفقیت ویرایش شد");
        hideModal();
        form.resetFields();
        EditTreeHandler(clickedTree?.id, payload);
      })
      .catch((err) => {
        toast.error(err?.message ?? "ویرایش شاخه جدید با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  const typeValue = Form.useWatch("type", form);

  useEffect(() => {
    if (typeValue === 4) {
      form.resetFields(["title"]);
      form.setFieldValue("title", "");
    }
  }, [typeValue]);

  return (
    <>
      <Form
        name="add-child-to-tree"
        form={form}
        style={{ maxWidth: 600, marginTop: "10px" }}
        onFinish={isEdit ? onFinishUpdate : onFinishCreate}
        layout="vertical"
      >
        <Form.Item
          label="نوع"
          name="type"
          rules={[{ required: true, message: "لطفا نوع را وارد کنید" }]}
        >
          <Select options={options} loading={optionsLoading} />
        </Form.Item>

        {typeValue !== 4 && (
          <Form.Item
            label="عنوان"
            name="title"
            rules={[{ required: true, message: "لطفا عنوان را وارد کنید" }]}
          >
            <Input />
          </Form.Item>
        )}

        {isEdit && (
          <Form.Item
            label="نوع ویرایش"
            name="versionType"
            rules={[
              { required: true, message: "لطفا نوع ویرایش را وارد کنید" },
            ]}
          >
            <Select
              options={[
                { label: "ویرایش", value: 1 },
                { label: "غلط املایی", value: 2 },
              ]}
            />
          </Form.Item>
        )}

        <Form.Item
          label="شماره صفحه"
          name="number"
          rules={[{ required: true, message: "لطفا شماره صفحه را وارد کنید" }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label="اولویت"
          name="priority"
          rules={[{ required: false, message: "لطفا عنوان را وارد کنید" }]}
        >
          <Input />
        </Form.Item>
        {![6,2].includes(typeValue) && (
          <Form.Item
            label="متن"
            name="text"
            rules={[
              { required: typeValue === 4, message: "لطفا متن را وارد کنید" },
            ]}
          >
            <CKEditorComponent
              setEditorData={setEditorData}
              editorData={editorData}
            />
          </Form.Item>
        )}

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

export default AddChildToTreeForm;
