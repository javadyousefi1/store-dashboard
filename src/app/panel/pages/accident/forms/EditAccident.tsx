import React, { useCallback, useEffect, useState, useRef } from "react";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
import Spin from "global/antd-kit/spin";
// import Radio from "global/antd-kit/radio/radio";
// import Group from "global/antd-kit/radio/group";
import type { FormProps } from "global/antd-kit/form";
import Upload from "global/antd-kit/upload/Upload";
import Checkbox from "global/antd-kit/checkbox";
import Select from "global/antd-kit/select";
import Switch from "global/antd-kit/switch";
import Button from "global/antd-kit/button";
import { getAllCauseAccidents } from "@/api/setting";
import { getAllIncidentSuggestions } from "@/api/setting";
import Group from "global/antd-kit/radio/group";
import Tag from "global/antd-kit/tag";
import { getAllAdministrativeDivision } from "@/api/accident";
import useFetch from "global/hooks/useFetch";
import toast from "react-hot-toast";
import MuiDatePicker from "global/shared/inputs/DatePicker";
import {
  convertTimeStmapToIsoString,
  convertIsoStringToTimeStmap,
  convertTimestampToPersianDateTime,
} from "global/utils/helpers";
import { getAccidentById, updateAccident, deleteFile } from "@/api/accident";
import Popconfirm from "global/antd-kit/popconfirm";
import Image from "global/antd-kit/image";

const EditAccident: React.FC<{
  handleOk: () => void;
  handleRefreshTable: () => void;
  rowData: any;
}> = ({ handleOk, rowData, handleRefreshTable }) => {
  const { TextArea } = Input;

  const getAccidentByIdAgain = useCallback(() => {
    return getAccidentById(rowData.id);
  }, [rowData]);

  const { data, loading } = useFetch(getAccidentByIdAgain);

  const { data: provinceData } = useFetch(getAllAdministrativeDivision);

  const [prevProvinceId, setPrevProvinceId] = useState(null);
  const [prevTownId, setPrevTownId] = useState(null);
  const [prevDistrictId, setPrevDistrictId] = useState(null);

  const onFinish = async (values) => {
    const testFile = values.files.map((item) => {
      if (item?.originFileObj) {
        return item?.originFileObj;
      } else {
        return [];
      }
    });

    const causeAccidentsId = values.causeAccidents.map((item) => {
      if (item?.label) {
        return item.value;
      } else {
        return item;
      }
    });

    const incidentSuggestionsId = values.incidentSuggestions.map((item) => {
      if (item?.label) {
        return item.value;
      } else {
        return item;
      }
    });

    const convertedToIsoString = convertTimeStmapToIsoString(
      values.occurrenceDate
    );
    const formData = new FormData();
    formData.append("id", rowData.id);
    formData.append("title", values.title);
    causeAccidentsId.forEach((item) => {
      formData.append("causeAccidents", item);
    });
    incidentSuggestionsId.forEach((item) => {
      formData.append("incidentSuggestions", item);
    });
    formData.append("provinceId", values.provinceId);
    formData.append("townId", values.townId);
    formData.append("districtId", values.districtId);
    formData.append("cityId", values.cityId);
    formData.append("address", values.address);
    formData.append("isActive", values.isActive);

    testFile.forEach((item) => {
      // if (!item === null) {
      formData.append("files", item);
      // }
    });
    // values.files.forEach((file) => {
    //   formData.append("files", file.originFileObj);
    // });
    formData.append("description", values.description);
    formData.append("result", values.result);
    formData.append("occurrenceDate", convertedToIsoString);
    try {
      const response = await updateAccident(formData);
      handleOk();
      toast.success("حادثه با موفقیت ویرایش شد");
      handleRefreshTable();
      console.log("accident respone", response);
    } catch (error) {
      toast.error("ویرایش حادثه با خطا مواجه شد");
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

  const handleDeleteImage = async (fileId) => {
    const separateFileId = fileId.split("-");
    const pureId = separateFileId[1];
    const id = {
      ids: [pureId],
    };
    try {
      const response = await deleteFile(id);
      toast.success("عکس با موفقیت حذف شد");
    } catch (error) {
      toast.error("حذف عکس با خطا مواجه شد");
    }
  };

  useEffect(() => {
    const currentProvinceId = form.getFieldValue("provinceId");
    if (prevProvinceId !== currentProvinceId) {
      form.resetFields(["townId", "districtId", "cityId"]);
      setPrevProvinceId(currentProvinceId);
    }
  }, [form.getFieldValue("provinceId")]);

  useEffect(() => {
    const currentTownId = form.getFieldValue("townId");
    if (prevTownId !== currentTownId) {
      form.resetFields(["districtId", "cityId"]);
      setPrevTownId(currentTownId);
    }
  }, [form.getFieldValue("townId")]);

  useEffect(() => {
    const currentDistrictId = form.getFieldValue("districtId");
    if (prevDistrictId !== currentDistrictId) {
      form.resetFields(["cityId"]);
      setPrevDistrictId(currentDistrictId);
    }
  }, [form.getFieldValue("districtId")]);

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
    source: string;
    text: string;
    bannerFile?: string;
    thumbnailFile?: string;
    isActive: boolean;
    occurrenceDate: number;
  };

  useEffect(() => {
    if (!loading) {
      form.setFieldsValue({
        title: data?.data?.title,
        occurrenceDate: convertIsoStringToTimeStmap(rowData?.occurrenceDate),
        incidentSuggestions: data?.data?.incidentSuggestions.map((item) => ({
          value: item.id,
          label: item.title,
        })),
        causeAccidents: data?.data?.causeAccidents.map((item) => ({
          value: item.id,
          label: item.title,
        })),
        address: data?.data?.address,
        description: data?.data?.description,
        result: data?.data?.result,
        provinceId: rowData?.province?.id,
        townId: rowData?.town?.id,
        districtId: rowData?.district?.id,
        cityId: rowData?.city?.id,
        isActive: data?.data?.isActive,
        files: data?.data?.files.map((item) => ({
          uid: `-${item.id}`,
          name: "",
          status: "done",
          url: item.path,
        })),
      });
      setPrevProvinceId(rowData?.province?.id);
      setPrevTownId(rowData?.town?.id);
      setPrevDistrictId(rowData?.district?.id);
    }
  }, [form, loading]);

  return !loading ? (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-1">
        <span className="text-text-grade3">عنوان: </span>
        <p>{data?.data?.title}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-text-grade3">تاریخ اتفاق: </span>
        <p>{convertTimestampToPersianDateTime(data?.data?.occurrenceDate)}</p>
      </div>
      <div className="flex items-center gap-1 col-span-2">
        <span className="text-text-grade3">علت حادثه: </span>
        {data?.data?.causeAccidents?.map((item) => (
          <Tag key={item?.id} color="blue">
            {item?.title}
          </Tag>
        ))}
      </div>
      <div>
        <span className="text-text-grade3">استان: </span>
        {data?.data?.province?.title}
      </div>
      <div>
        <span className="text-text-grade3">شهرستان: </span>
        {data?.data?.town?.title}
      </div>
      <div>
        <span className="text-text-grade3">بخش: </span>
        {data?.data?.district?.title}
      </div>
      <div>
        <span className="text-text-grade3">شهر: </span>
        {data?.data?.city?.title}
      </div>
      <div>
        <span className="text-text-grade3">آدرس: </span>
        {data?.data?.address}
      </div>
      <div>
        <span className="text-text-grade3">شرح حادثه: </span>
        {data?.data?.description}
      </div>
      <div className="col-span-2 text-text-grade3">
        <span>نتیجه حادثه: </span>
        {data?.data?.result}
      </div>
      <div className="flex items-center gap-1 col-span-2">
        <span className="text-text-grade3">پیشنهادات: </span>
        {data?.data?.incidentSuggestions?.map((item) => (
          <Tag key={item?.id} color="blue">
            {item?.title}
          </Tag>
        ))}
      </div>
      <div className="col-span-2">
        <span className="text-text-grade3">وضعیت: </span>
        {data?.data?.isActive ? "فعال"  : "غیرفعال"}
      </div>
      <div>
      <span className="text-text-grade3">عکس‌ها</span>
      {data?.data?.files?.map((item) => (
        <Image
        className="rounded-lg"
        src={item?.path}
        />
      ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  );

  // return !loading ? (
  //   <Form
  //     className="grid grid-cols-2 gap-4"
  //     name="basic"
  //     layout="vertical"
  //     onFinish={onFinish}
  //     form={form}
  //     onFinishFailed={onFinishFailed}
  //     // initialValues={{
  //     //   provinceId: rowData?.province?.id,
  //     //   townId: rowData?.town?.id,
  //     //   districtId: rowData?.district?.id,
  //     //   cityId: rowData?.city?.id,
  //     // }}
  //   >
  //     <Form.Item<FieldType>
  //       label="عنوان"
  //       name="title"
  //       rules={[{ required: true, message: "عنوان را وارد کنید" }]}
  //     >
  //       <Input />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="تاریخ اتفاق"
  //       name="occurrenceDate"
  //       rules={[{ required: true, message: "لطفا تاریخ اتفاق را وارد نمایید" }]}
  //       className="w-full"
  //     >
  //       {/* <Input /> */}
  //       <MuiDatePicker style={{}} label="" name="" onChange={() => {}} />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="علت حادثه"
  //       name="causeAccidents"
  //       rules={[{ required: true, message: "علت حادثه را وارد کنید" }]}
  //     >
  //       <Select
  //         maxTagCount="responsive"
  //         mode="tags"
  //         tokenSeparators={[","]}
  //         options={causeAccidentsOptions}
  //       />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="پیشنهادات"
  //       name="incidentSuggestions"
  //       rules={[{ required: true, message: "پیشنهادات را وارد کنید" }]}
  //     >
  //       <Select
  //         mode="tags"
  //         maxTagCount="responsive"
  //         tokenSeparators={[","]}
  //         options={incidentSuggestionsOptions}
  //       />
  //     </Form.Item>

  //     {/* living area */}
  //     <Form.Item<FieldType>
  //       label="استان"
  //       name="provinceId"
  //       rules={[{ required: true, message: "استان را وارد کنید" }]}
  //     >
  //       <Select options={provinceSelectBoxOptions} defaultValue="انتخاب کنید" />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="شهرستان"
  //       name="townId"
  //       rules={[{ required: true, message: "شهرستان را وارد کنید" }]}
  //     >
  //       <Select
  //         disabled={!form.getFieldValue("provinceId")}
  //         defaultValue="انتخاب کنید"
  //         notFoundContent={
  //           townLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
  //         }
  //         loading={townLoading}
  //         options={townSelectBoxOptions}
  //       />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="بخش"
  //       name="districtId"
  //       rules={[{ required: true, message: "بخش را وارد کنید" }]}
  //     >
  //       <Select
  //         disabled={!townId}
  //         defaultValue="انتخاب کنید"
  //         notFoundContent={
  //           districtLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
  //         }
  //         loading={districtLoading}
  //         options={districtSelectBoxOptions}
  //       />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="شهر"
  //       name="cityId"
  //       rules={[{ required: true, message: "شهر را وارد کنید" }]}
  //     >
  //       <Select
  //         disabled={!districtId}
  //         defaultValue="انتخاب کنید"
  //         notFoundContent={
  //           cityLoading ? <Spin size="small" /> : "نتیجه‌ای یافت نشد"
  //         }
  //         loading={cityLoading}
  //         options={citySelectBoxOptions}
  //       />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="آدرس"
  //       name="address"
  //       className="col-span-2"
  //       rules={[{ required: true, message: "آدرس را وارد کنید" }]}
  //     >
  //       <TextArea rows={4} />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="شرح حادثه"
  //       name="description"
  //       rules={[{ required: true, message: "شرح حادثه را وارد کنید" }]}
  //       className="col-span-2"
  //     >
  //       <TextArea rows={4} />
  //     </Form.Item>

  //     <Form.Item<FieldType>
  //       label="نتیجه حادثه"
  //       name="result"
  //       rules={[{ required: true, message: "نتیجه حادثه را وارد کنید" }]}
  //       className="col-span-2"
  //     >
  //       <TextArea rows={4} />
  //     </Form.Item>

  //     <Form.Item
  //       className="!mb-0"
  //       name="isActive"
  //       label="وضعیت"
  //       valuePropName="checked"
  //     >
  //       <Switch />
  //     </Form.Item>

  //     <Form.Item
  //       label="عکس‌ها (سقف 5 عدد)"
  //       name="files"
  //       className="col-span-2"
  //       valuePropName="fileList"
  //       getValueFromEvent={normFile}
  //       rules={[{ required: true, message: "حداقل یک عکس اضافه کنید" }]}
  //     >
  //       <Upload
  //         multiple
  //         maxCount={5}
  //         beforeUpload={() => {
  //           return false;
  //         }}
  //         accept="image/png,image/jpeg"
  //         onRemove={(file) => {
  //           handleDeleteImage(file.uid);
  //         }}
  //         listType="picture-card"
  //       >
  //         <button style={{ border: 0, background: "none" }} type="button">
  //           <svg
  //             className="m-auto"
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="24"
  //             height="24"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               fill="#767676"
  //               d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
  //             />
  //             <path
  //               fill="#767676"
  //               fill-rule="evenodd"
  //               d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
  //               clip-rule="evenodd"
  //             />
  //           </svg>
  //           <div style={{ marginTop: 8 }}>افزودن</div>
  //         </button>
  //       </Upload>
  //     </Form.Item>

  //     <Form.Item className="flex justify-end col-span-2">
  //       <Button className="ml-4" onClick={handleOk}>
  //         لغو
  //       </Button>
  //       <Button type="primary" htmlType="submit" className="px-8">
  //         ثبت
  //       </Button>
  //     </Form.Item>
  //   </Form>
  // ) : (
  //   <div className="flex items-center justify-center">
  //     <Spin />
  //   </div>
  // );
};

export default EditAccident;
