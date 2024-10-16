import React, { useEffect, useCallback } from "react";
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
import { FilterObject } from "global/types";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const AccidentTableFilter: React.FC = ({
  handleHideFilterModal,
  handleSetFilter,
  filter,
}) => {
  const [form] = Form.useForm();

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

  const { data: provinceData, loading: getAllAdminLoading } = useFetch(
    getAllAdministrativeDivision
  );
  const { data: townData, loading: townLoading } = useFetch(handleGetAllTowns);
  const { data: districtData, loading: districtLoading } = useFetch(
    handleGetAllDistricts
  );
  const { data: cityData, loading: cityLoading } = useFetch(handleGetAllCities);

  const { data: causeAccidentsData, loading: causeAccidentsLoading } =
    useFetch(getAllCauseAccidents);

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

  useEffect(() => {
    console.log(filter);
    filter.forEach((item) => {
      if (item.queryName.toLowerCase().includes("date")) {
        form.setFieldValue(item.queryName, item.timeStamp);
      } else {
        form.setFieldValue(item.queryName, item.value);
      }
    });
  }, [
    filter,
    form,
    cityLoading,
    townLoading,
    districtLoading,
    getAllAdminLoading,
  ]);

  type FieldType = {
    causeAccidents: string;
    incidentSuggestions: string;
    isActive: boolean;
    provinceId: string;
    cityId: string;
    districtId: string;
    townId: string;
    occurrenceDate: number;
    fromCreateDate: string;
    toCreateDate: string;
    fromOccurrenceDate: string;
    toOccurrenceDate: string;
  };

  const onFinish = (values) => {
    const filterItemList: FilterObject[] = [
      // const filterItemList = [
      // {
      //   id: 1,
      //   queryName: "isActive",
      //   value: values.isActive ? "true" : "false",
      //   name: "وضعیت",
      //   view: values.isActive ? "فعال" : "غیر فعال",
      // },
      {
        id: 2,
        relationId: [3, 4, 5],
        queryName: "provinceId",
        value: values.provinceId,
        name: "استان",
        view: provinceSelectBoxOptions?.find(
          (item) => item.value === values.provinceId
        )?.label,
      },
      {
        id: 3,
        relationId: [4, 5],
        queryName: "townId",
        value: values.townId,
        name: "شهرستان",
        view: townSelectBoxOptions?.find((item) => item.value === values.townId)
          ?.label,
      },
      {
        id: 4,
        relationId: [5],
        queryName: "districtId",
        value: values.districtId,
        name: "بخش",
        view: districtSelectBoxOptions?.find(
          (item) => item.value === values.districtId
        )?.label,
      },
      {
        id: 5,
        queryName: "cityId",
        value: values.cityId,
        name: "شهر",
        view: citySelectBoxOptions?.find((item) => item.value === values.cityId)
          ?.label,
      },
      {
        id: 6,
        queryName: "fromCreateDate",
        value:
          typeof values.fromCreateDate == "object"
            ? convertTimeStmapToIsoString(values.fromCreateDate)
            : values.fromCreateDate,
        name: "از تاریخ ایجاد",
        view: values.fromCreateDate,
        timeStamp: values.fromCreateDate,
      },
      {
        id: 7,
        queryName: "toCreateDate",
        value:
          typeof values.toCreateDate == "object"
            ? convertTimeStmapToIsoString(values.toCreateDate)
            : values.toCreateDate,
        name: "تا تاریخ ایجاد",
        view: values.toCreateDate,
        timeStamp: values.toCreateDate,
      },
      {
        id: 8,
        queryName: "fromOccurrenceDate",
        value:
          typeof values.fromOccurrenceDate == "object"
            ? convertTimeStmapToIsoString(values.fromOccurrenceDate)
            : values.fromOccurrenceDate,
        name: "از تاریخ اتفاق",
        view: values.fromOccurrenceDate,
        timeStamp: values.fromOccurrenceDate,
      },
      {
        id: 9,
        queryName: "toOccurrenceDate",
        value:
          typeof values.toOccurrenceDate == "object"
            ? convertTimeStmapToIsoString(values.toOccurrenceDate)
            : values.toOccurrenceDate,
        name: "تا تاریخ اتفاق",
        view: values.toOccurrenceDate,
        timeStamp: values.toOccurrenceDate,
      },
      {
        id: 10,
        queryName: "CuaseAccidentId",
        value: values.CuaseAccidentId,
        name: "علت حادثه",
        view: causeAccidentsOptions?.find(
          (item) => item.value === values.CuaseAccidentId
        )?.label,
      },
    ];
    handleSetFilter(filterItemList);
    form.resetFields();
    handleHideFilterModal();
  };

  return (
    <Form
      className="grid grid-cols-2 gap-4 w-[700px]"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={{ isActive: true }}
    >
      {/* <Form.Item<FieldType>
        label="تاریخ اتفاق"
        name="occurrenceDate"
        rules={[{ required: true, message: "لطفا تاریخ اتفاق را وارد نمایید" }]}
        className="w-full"
      >
        <MuiDatePicker style={{}} label="" name="" onChange={() => {}} />
      </Form.Item> */}

      {/* living area */}
      <Form.Item<FieldType> label="استان" name="provinceId">
        <Select options={provinceSelectBoxOptions} defaultValue="انتخاب کنید" />
      </Form.Item>

      <Form.Item<FieldType> label="شهرستان" name="townId">
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

      <Form.Item<FieldType> label="بخش" name="districtId">
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

      <Form.Item<FieldType> label="شهر" name="cityId">
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

      <Form.Item label="از تاریخ ایجاد" name={"fromCreateDate"}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          render={
            <Form.Item className="mb-0" name={"fromCreateDate"}>
              <Input
                allowClear
                suffix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
            </Form.Item>
          }
        />
      </Form.Item>

      <Form.Item label="تا تاریخ ایجاد" name={"toCreateDate"}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          render={
            <Form.Item className="mb-0" name={"toCreateDate"}>
              <Input
                allowClear
                suffix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
            </Form.Item>
          }
        />
      </Form.Item>

      <Form.Item label="از تاریخ اتفاق" name={"fromOccurrenceDate"}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          render={
            <Form.Item className="mb-0" name={"fromOccurrenceDate"}>
              <Input
                allowClear
                suffix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
            </Form.Item>
          }
        />
      </Form.Item>

      <Form.Item label="تا تاریخ اتفاق" name={"toOccurrenceDate"}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          render={
            <Form.Item className="mb-0" name={"toOccurrenceDate"}>
              <Input
                allowClear
                suffix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                    />
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
            </Form.Item>
          }
        />
      </Form.Item>

      {/* <Form.Item<FieldType>
        className="!mb-0"
        name="isActive"
        label="وضعیت"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item> */}

      {/* <Form.Item<FieldType> */}
      <Form.Item
        label="علت حادثه"
        name="CuaseAccidentId"
        rules={[{ required: false, message: "علت حادثه را وارد کنید" }]}
      >
        <Select
          // mode="tags"
          maxTagCount="responsive"
          // tokenSeparators={[","]}
          options={causeAccidentsOptions}
        />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 0 }}
        className="flex justify-end col-span-2"
      >
        <Button className="ml-4" onClick={handleHideFilterModal}>
          انصراف
        </Button>
        <Button type="primary" htmlType="submit" className="px-8">
          ثبت
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccidentTableFilter;
