import React, { useState } from "react";
import toast from "react-hot-toast";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
import Radio from "global/antd-kit/radio/radio";
import Group from "global/antd-kit/radio/group";
import type { FormProps } from "global/antd-kit/form";
import type { RadioChangeEvent } from "global/antd-kit";
import Button from "global/antd-kit/button";
import { createIncidentSuggestions } from "@/api/setting";
import  Switch from "global/antd-kit/switch";

const AddIncidentSuggestionsForm: React.FC<{
  handleCancelAddModal: () => void;
  handleUpdateEditionVersion: () => void;
}> = ({handleCancelAddModal, handleUpdateEditionVersion}) => {

  const [value, setValue] = useState(true);

  const [form] = Form.useForm();

  const onChange = (e:RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  type FieldType = {
    title: string;
    isActive: boolean ;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const loading = toast.loading("در حال ثبت پیشنهاد");
      try{
        const response = await createIncidentSuggestions(values);
        handleCancelAddModal();
        toast.dismiss(loading);
        toast.success("حادثه با موفقیت ایجاد شد");
        form.resetFields();
        handleUpdateEditionVersion();
    }
    catch (error){
      toast.dismiss(loading);
      toast.error("ایجاد حادثه با خطا مواجه شد");
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
    form={form}
    name="basic"
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    initialValues={{ isActive: true }}
    >
      <Form.Item<FieldType>
        label="عنوان"
        name="title"
        rules={[{ required: true, message: "وارد کردن عنوان اجباری است" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        className="!mb-0"
        name="isActive"
        label="وضعیت"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <div className="flex justify-end gap-4">
      <Button onClick={handleCancelAddModal} >
      انصراف
          </Button>
      <Form.Item style={{marginBottom:0}}>
      <Button type="primary" htmlType="submit" className="px-8">
        ثبت
      </Button>
    </Form.Item>
    </div>
    </Form>
  );


};
export default AddIncidentSuggestionsForm;
