import { getAllSubjectOfSurvey } from "@/api/setting";
import { Button, Form, Select, Switch } from "antd";
import useFetch from "global/hooks/useFetch";
import MuiDatePicker from "global/shared/inputs/DatePicker";
import { FilterObject } from "global/types";
import {
  convertTimestampToPersianDate,
  convertTimeStmapToIsoString,
} from "global/utils/helpers";
import Input from "global/antd-kit/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect } from "react";

const TableFitler = ({ handleHideFilterModal, handleSetFilter, filter }) => {
  const { data, loading: optionsLoading } = useFetch<{
    id: number;
    title: string;
  }>(getAllSubjectOfSurvey);
  const [form] = Form.useForm();

  const options = data?.data?.items.map((item) => {
    return { label: item.title, value: item.id };
  });

  const onSubmit = (values) => {
    const filterItemList: FilterObject[] = [
      {
        id: 1,
        queryName: "subjectOfSurveyId",
        value: values.subjectOfSurveyId,
        name: "موضوع نظرسنجی",
        view: options.find((item) => item.value == values.subjectOfSurveyId)
          ?.label,
      },
      {
        id: 2,
        queryName: "fromDate",
        value:
          typeof values.fromDate == "object"
            ? convertTimeStmapToIsoString(values.fromDate)
            : values.fromDate,

        name: "از تاریخ",
        view: values.fromDate,
        timeStamp: values.fromDate,
      },
      {
        id: 3,
        queryName: "toDate",
        value:
          typeof values.toDate == "object"
            ? convertTimeStmapToIsoString(values.toDate)
            : values.toDate,
        name: "تا تاریخ",
        view: values.toDate,
        timeStamp: values.toDate,
      },
    ];

    // console.log(filterItemList);
    // return;
    handleSetFilter(filterItemList);
    handleHideFilterModal();
  };

  useEffect(() => {
    filter.forEach((item) => {
      if (
        item.queryName == "fromDate" ||
        item.queryName == "toDate"
      ) {
        form.setFieldValue(item.queryName, item.timeStamp);
      } else {
        form.setFieldValue(item.queryName, item.value);
      }
    });
  }, [
    // filter,
    form,
  ]);

  return (
    <>
      <div className="w-[700px]">
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ isActive: false }}
        >
          <div className="grid grid-cols-2 mt-5 gap-x-4">
            <Form.Item
              label="موضوع نظر سنجی"
              name="subjectOfSurveyId"
              className="col-span-2"
              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب کردن موضوع نظر سنجی اجباری است",
              //   },
              // ]}
            >
              <Select
                allowClear
                className="w-full "
                options={options}
                loading={optionsLoading}
                disabled={optionsLoading}
                notFoundContent={<>موضوع نظرسنجی ای در سامانه ثبت نشده است</>}
              />
            </Form.Item>

            <Form.Item label="از تاریخ" name={"fromDate"}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                render={
                  <Form.Item className="mb-0" name={"fromDate"}>
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

            <Form.Item label="تا تاریخ" name={"toDate"}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                render={
                  <Form.Item className="mb-0" name={"toDate"}>
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

            <div className="flex justify-end col-span-2 gap-x-4">
              <Button onClick={handleHideFilterModal}>انصراف</Button>
              <Button htmlType="submit" className="px-8" type="primary">
                ثبت
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default TableFitler;
