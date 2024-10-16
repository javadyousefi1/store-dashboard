import React, { useState } from "react";
// componetns
import { Form, InputNumber, Button, Switch, Spin} from "antd";
// api
import { editSliderSetting, getSliderSetting } from "@/api/setting";
// hook
import useFetch from "global/hooks/useFetch";
// toast
import toast from "react-hot-toast";

interface SliderSettingFormType {
  pictureNumber: number;
  rotationTime: number;
  isRotation: boolean;
}

const ChangeSliderSettingForm: React.FC<{
  handleCancelAddModal: () => void;
}> = ({handleCancelAddModal}) => {
  const [loading, setLoading] = useState(false);
  const { data, loading: getIntialGetDataLoading } = useFetch(getSliderSetting);

  const onFinish = async (values: SliderSettingFormType) => {
    setLoading(true);
    const payload = {
      pictureNumber: values.pictureNumber,
      rotationTime: values.rotationTime*1000,
      isRotation: values.isRotation
    }
    try {
      await editSliderSetting(payload);
      setLoading(false);
      toast.success("تنظیمات اسلایدر با موفقیت اعمال شد");
      handleCancelAddModal();
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "ثبت تنظمیات اسلایدر با خطا مواجه شد");
    }
  };

  return (
    <div className="w-full mt-3">
      {getIntialGetDataLoading ? (
        <div className="h-full">
          <div className="flex items-center justify-center w-full h-full">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <Form
          initialValues={{
            pictureNumber: data?.data?.pictureNumber,
            rotationTime: data?.data?.rotationTime/1000,
            isRotation: data?.data?.isRotation ?? false,
          }}
          onFinish={onFinish}
          layout="vertical"
          className="!w-full"
        >
          <Form.Item
            label="تعداد عکس"
            name="pictureNumber"
            rules={[
              { required: true, message: "وارد کردن تعداد عکس اجباری است" },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="مدت زمان چرخش بین عکس‌ها"
            name="rotationTime"
            rules={[
              {
                required: true,
                message: "وارد کردن مقدار زمان گردش عکس اجباری است",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="چرخش خودکار"
            name="isRotation"
            valuePropName="checked"
            rules={[
              { required: true, message: "انتخاب وضعیت گردش عکس اجباری است" },
            ]}
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="px-8"
              >
                ثبت
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ChangeSliderSettingForm;
