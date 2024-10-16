import { Button, Form, Switch } from "antd";
import { FilterObject } from "global/types";

const TableFitler = ({ handleHideFilterModal, handleSetFilter }) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    const filterItemList: FilterObject[] = [
      {
        id: 1,
        queryName: "isActive",
        value: values.isActive,
        name: "وضعیت",
        view: values.isActive ? "فعال" : "غیر فعال",
      },
    ];

    handleSetFilter(filterItemList);
    handleHideFilterModal()
  };
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
            <Form.Item label="وضعیت" name="isActive">
              <Switch />
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
