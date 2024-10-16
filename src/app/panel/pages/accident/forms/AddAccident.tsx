import React, { useCallback, useEffect, useState } from "react";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
import Spin from "global/antd-kit/spin";
import Switch from "global/antd-kit/switch";
import type { FormProps } from "global/antd-kit/form";
import Upload from "global/antd-kit/upload/Upload";
import Select from "global/antd-kit/select";
import Button from "global/antd-kit/button";
import { getAllCauseAccidents } from "@/api/setting";
import { getAllIncidentSuggestions } from "@/api/setting";
import { getAllAdministrativeDivision } from "@/api/accident";
import { createAccident } from "@/api/accident";
import useFetch from "global/hooks/useFetch";
import toast from "react-hot-toast";
import MuiDatePicker from "global/shared/inputs/DatePicker";
import { convertTimeStmapToIsoString } from "global/utils/helpers";

const AddAccident: React.FC<{
  handleOk: () => void;
  handleRefreshTable: () => void;
}> = ({ handleOk,handleRefreshTable }) => {

  const { TextArea } = Input;
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    const loading = toast.loading("در حال ثبت حادثه");
    const convertedToIsoString = convertTimeStmapToIsoString(
      values.occurrenceDate
    );
    const formData = new FormData();
    formData.append("title", values.title);
    values.causeAccidents.forEach((item) => {
      formData.append("causeAccidents", item);
    });
    values.incidentSuggestions.forEach((item) => {
      formData.append("incidentSuggestions", item);
    });
    formData.append("provinceId", values.provinceId);
    formData.append("isActive",values.isActive);
    formData.append("townId", values.townId);
    formData.append("districtId", values.districtId);
    formData.append("cityId", values.cityId);
    formData.append("address", values.address);
    values.files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    
    formData.append("description", values.description);
    formData.append("result", values.result);
    formData.append("occurrenceDate", convertedToIsoString);
    try {
      const response = await createAccident(formData);
      handleOk();
      toast.dismiss(loading);
      toast.success("حادثه با موفقیت ایجاد شد");
      form.resetFields();
      handleRefreshTable();
    } catch (error) {
      toast.dismiss(loading);
      toast.error("ایجاد حادثه با خطا مواجه شد");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const provinceId = Form.useWatch("provinceId", form);
  const townId = Form.useWatch("townId", form);
  const districtId = Form.useWatch("districtId", form);
  const cityId = Form.useWatch("cityId", form);

  const handleGetAllTowns = useCallback(() => {
    if (provinceId) {
      return getAllAdministrativeDivision(provinceId);
    }
  }, [provinceId]);

  const handleGetAllDistricts = useCallback(() => {
    if (townId) {
      return getAllAdministrativeDivision(townId);
    }
  }, [townId]);

  const handleGetAllCities = useCallback(() => {
    if (districtId) {
      return getAllAdministrativeDivision(districtId);
    }
  }, [districtId]);

  const { data: provinceData } = useFetch(getAllAdministrativeDivision);
  const { data: townData, loading: townLoading } = useFetch(handleGetAllTowns);
  const { data: districtData, loading: districtLoading } = useFetch(
    handleGetAllDistricts
  );
  const { data: cityData, loading: cityLoading } = useFetch(handleGetAllCities);
  const { data: causeAccidentsData, loading: causeAccidentsLoading } =
    useFetch(getAllCauseAccidents);
  const { data: incidentSuggestionsData, loading: incidentSuggestionsLoading } =
    useFetch(getAllIncidentSuggestions);

  const provinceSelectBoxOptions = provinceData?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const townSelectBoxOptions = townData?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const districtSelectBoxOptions = districtData?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const citySelectBoxOptions = cityData?.data?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const causeAccidentsOptions = causeAccidentsData?.data?.items?.map(
    (item) => ({
      value: item.id,
      label: item.title,
    })
  );

  const incidentSuggestionsOptions = incidentSuggestionsData?.data?.items?.map(
    (item) => ({
      value: item.id,
      label: item.title,
    })
  );

  useEffect(() => {
    if (provinceId) {
      form.resetFields(["townId", "districtId", "cityId"]);
    }
  }, [provinceId]);

  useEffect(() => {
    if (townId) {
      form.resetFields(["districtId", "cityId"]);
    }
  }, [townId]);

  useEffect(() => {
    if (districtId) {
      form.resetFields(["cityId"]);
    }
  }, [districtId]);


  type FieldType = {
    title: string;
    causeAccidents: string;
    incidentSuggestions: string;
    address: string;
    description: string;
    result: string;
    provinceId: string;
    cityId: string;
    districtId: string;
    townId: string;
    files: string;
    text: string;
    isActive: boolean;
    occurrenceDate: number;
  };

  // if (loading) {
  //   return toast.loading("در حال ایجاد حادثه")
  // }

  return (
    <Form
      className="grid grid-cols-2 gap-4"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      initialValues={{ isActive: true }}
    >
      <Form.Item<FieldType>
        label="عنوان"
        name="title"
        rules={[{ required: true, message: "عنوان را وارد کنید" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="تاریخ اتفاق"
        name="occurrenceDate"
        rules={[{ required: true, message: "لطفا تاریخ اتفاق را وارد نمایید" }]}
        className="w-full"
      >
        {/* <Input /> */}
        <MuiDatePicker style={{}} label="" name="" onChange={() => {}} />
      </Form.Item>

      <Form.Item<FieldType>
        label="علت حادثه"
        name="causeAccidents"
        rules={[{ required: true, message: "علت حادثه را وارد کنید" }]}
      >
        <Select
          mode="tags"
          maxTagCount="responsive"
          tokenSeparators={[","]}
          options={causeAccidentsOptions}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="پیشنهادات"
        name="incidentSuggestions"
        rules={[{ required: true, message: "پیشنهادات را وارد کنید" }]}
      >
        <Select
          mode="tags"
          maxTagCount="responsive"
          tokenSeparators={[","]}
          options={incidentSuggestionsOptions}
        />
      </Form.Item>

      {/* living area */}
      <Form.Item<FieldType>
        label="استان"
        name="provinceId"
        rules={[{ required: true, message: "استان را وارد کنید" }]}
      >
        <Select options={provinceSelectBoxOptions} defaultValue="انتخاب کنید" />
      </Form.Item>

      <Form.Item<FieldType>
        label="شهرستان"
        name="townId"
        rules={[{ required: true, message: "شهرستان را وارد کنید" }]}
      >
        <Select
          disabled={!provinceId}
          defaultValue="انتخاب کنید"
          notFoundContent={
            townLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
          }
          loading={townLoading}
          options={townSelectBoxOptions}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="بخش"
        name="districtId"
        rules={[{ required: true, message: "بخش را وارد کنید" }]}
      >
        <Select
          disabled={!townId}
          defaultValue="انتخاب کنید"
          notFoundContent={
            districtLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
          }
          loading={districtLoading}
          options={districtSelectBoxOptions}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="شهر"
        name="cityId"
        rules={[{ required: true, message: "شهر را وارد کنید" }]}
      >
        <Select
          disabled={!districtId}
          defaultValue="انتخاب کنید"
          notFoundContent={
            cityLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
          }
          loading={cityLoading}
          options={citySelectBoxOptions}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="آدرس"
        name="address"
        className="col-span-2"
        rules={[{ required: true, message: "آدرس را وارد کنید" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item<FieldType>
        label="شرح حادثه"
        name="description"
        rules={[{ required: true, message: "شرح حادثه را وارد کنید" }]}
        className="col-span-2"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item<FieldType>
        label="نتیجه حادثه"
        name="result"
        rules={[{ required: true, message: "نتیجه حادثه را وارد کنید" }]}
        className="col-span-2"
      >
        <TextArea rows={4} />
      </Form.Item>

      {/* <Form.Item
        className="!mb-0"
        name="isActive"
        label="وضعیت"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item> */}

      <Form.Item
        label="عکس‌ها (سقف 5 عدد)"
        name="files"
        className="col-span-2"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "حداقل یک عکس اضافه کنید" }]}
      >
        <Upload
          // onChange={handleUploadChange}
          multiple
          accept="image/png,image/jpeg"
          maxCount={5}
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

      <Form.Item style={{marginBottom:0}} className="flex justify-end col-span-2">
      <Button className="ml-4" onClick={handleOk} >
      انصراف
          </Button>
        <Button type="primary" htmlType="submit" className="px-8">
          ثبت
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccident;
