import Form from "global/antd-kit/form";
import Switch from "global/antd-kit/switch";
import { FilterObject } from "global/types";
import Button from "global/antd-kit/button";
import { useEffect } from "react";

const RssTableFilterComponent: React.FC = ({
  handleHideFilterModal,
  handleSetFilter,
  filter,
}) => {
  const [form] = Form.useForm();
  type FieldType = {
    checkNews: boolean;
  };

  useEffect(() => {
    const switchValue = filter.find(
      (item) => item.queryName === "checkNews"
    )?.value;

    console.log(switchValue);
    form.setFieldValue("checkNews", switchValue);
  }, []);

  console.log(filter);
  const onFinish = (values) => {
    const filterItemList: FilterObject[] = [
      {
        id: 1,
        queryName: "checkNews",
        value: values.checkNews ? values.checkNews : "false",
        name: "وضعیت",
        view: values.checkNews ? "متصل به اخبار" : "غیر متصل به اخبار",
      },
    ];
    handleSetFilter(filterItemList);
    handleHideFilterModal();
  };
  return (
    <Form
      className="grid grid-cols-2 gap-4 w-[700px]"
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      // initialValues={{ checkNews: true }}
    >
      <Form.Item<FieldType>
        className="!mb-0"
        name="checkNews"
        label="اتصال به اخبار"
        valuePropName="checked"
      >
        <Switch defaultChecked={false} />
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

export default RssTableFilterComponent;
