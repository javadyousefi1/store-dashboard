// react
import { useState } from "react";
// api
import { apiAddExam, apiupdateExam } from "@/api/exam";
import { apiGetAllDegrees } from "@/api/degree";
// antd
import { Form, Input } from "antd";
// global features
import Button from "global/antd-kit/button";
import TextArea from "global/antd-kit/input/TextArea";
import Switch from "global/antd-kit/switch";
import Select from "global/antd-kit/select";
import {
  convertIsoToPersianDate,
  convertTimeStmapToIsoString,
} from "global/utils/helpers";
import useFetch from "global/hooks/useFetch";
// react hot toast
import toast from "react-hot-toast";
// multi date picker
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// component
import IconifyComp from "@/components/shared/IconifyComp";

const ExamForm = ({ hideModal, handleRefreshTable, rowData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { data: educationStage, loading: optionsLoading } =
    useFetch(apiGetAllDegrees);
  const options = educationStage?.data?.items;

  function onFinishCreate(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive);
    // formData.append("examEnum", values.examEnum);
    formData.append(
      "examDate",
      convertTimeStmapToIsoString(values.examDate?.unix * 1000)
    );
    formData.append("educationStageId", values.educationStageId);

    setLoading(true);
    const loading = toast.loading("در حال ثبت");
    apiAddExam(formData)
      .then((res) => {
        toast.success("آزمون جدید ثبت شد.");
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
    formData.append("title", values.title);
    formData.append("description", values.description ?? "");
    formData.append("isActive", values.isActive);
    // formData.append("examEnum", values.examEnum);
    formData.append(
      "examDate",
      convertTimeStmapToIsoString(values.examDate?.unix * 1000)
    );
    formData.append("educationStageId", values.educationStageId);

    setLoading(true);
    const loading = toast.loading("در حال ویرایش آزمون");
    apiupdateExam(formData)
      .then(() => {
        toast.success(`آزمون ${rowData.title} ویرایش شد.`);
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
              educationStageId: rowData?.educationStageId,
              examEnum: rowData?.examEnum,
              examDate: convertIsoToPersianDate(rowData?.examDate),
            }
            : {}
        }
      >

        {/* title */}
        <Form.Item
          label="عنوان"
          name="title"
          rules={[{ required: true, message: "لطفا عنوان را وارد کنید" }]}
        >
          <Input />
        </Form.Item>

        {/* EducationStageId */}
        <Form.Item
          label="مقطع"
          name="educationStageId"
          rules={[
            { required: true, message: "مقطع مورد نظر خود را وارد کنید" },
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

        {/* date of exam */}
        <Form.Item label="تاریخ آزمون" name="examDate" rules={[
          { required: true, message: "   تاریخ برگزاری آزمون را وارد کنید" },
        ]}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            render={
              <Form.Item className="mb-0" name="examDate">
                <Input
                  allowClear
                  suffix={<IconifyComp icon="calender" size="xl" />}
                />
              </Form.Item>
            }
          />
        </Form.Item>

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

export default ExamForm;
