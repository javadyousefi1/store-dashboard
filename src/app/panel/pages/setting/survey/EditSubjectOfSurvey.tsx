import React, { useEffect, useState, useCallback } from "react";
// componetns
import Spin from "global/antd-kit/spin";
import Popconfirm from "global/antd-kit/popconfirm";
import Form from "global/antd-kit/form";
import Input from "global/antd-kit/input";
import Button from "global/antd-kit/button";
import Switch from "global/antd-kit/switch";
// api
import {
  getAllSubjectOfSurvey,
  updateSubjectOfSurvey,
  deleteSubjectOfSurvey,
} from "@/api/setting";
// toast
import toast from "react-hot-toast";
//hooks
import useFetch from "global/hooks/useFetch";
import Empty from "global/antd-kit/empty";
import Typography from "global/antd-kit/typography";

interface WorkPositionType {
  title: string;
  isActive: boolean;
}

const EditSubjectOfSurvey: React.FC<{
  isSubjectInputVisible: boolean;
  setIsSubjectInputVisible: (arg0: boolean) => void;
}> = ({ isSubjectInputVisible, setIsSubjectInputVisible }) => {
  const [id, setId] = useState(0);
  const [updateCard, setUpdateCard] = useState(false);

  const getAllSubjectOfSurveyAgain = useCallback(() => {
    return getAllSubjectOfSurvey();
  }, [updateCard]);

  const handleUpdateCard = () => setUpdateCard((prev) => !prev);

  const { data, loading } = useFetch(getAllSubjectOfSurveyAgain);
  console.log("data", data);

  const handleConvert = (id: number) => {
    setId(id);
    setIsSubjectInputVisible(true);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await deleteSubjectOfSurvey(id);
      toast.success("حذف با موفقیت انجام شد");
    } catch (error) {
      toast.error(error.message)
    }
    handleUpdateCard();
  };

  const handleCloseInput = () => {
    setIsSubjectInputVisible(false);
  };

  const onFinish = async (values) => {
    const loading = toast.loading("در حال ثبت");

    const newObj = {
      id: id,
      isActive: values.isActive,
      title: values.title,
      switch: values.switch,
    };
    try {
      const response = await updateSubjectOfSurvey(newObj);
      toast.success("ویرایش موضوع با موفقیت ثبت شد");
      setIsSubjectInputVisible(false);
      handleUpdateCard();
    } catch (error) {
      toast.error("ویرایش موضوع با خطا مواجه شد");
    } finally {
      toast.dismiss(loading);
    }
  };

  if (!loading && data?.data?.items.length === 0) {
    return (
      <div>
      <Empty 
      // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 80 }}
      description={
        <Typography.Text>
          داده‌ای یافت نشد
        </Typography.Text>
      }
    >
      </Empty>
      </div>
    );
  }

  return data ? (
    <div className="flex flex-col gap-2">
      {data?.data?.items?.map((item, i) => (
        <>
          {isSubjectInputVisible && id === item.id ? (
            <Form
              initialValues={{
                title: item?.title,
                isActive: item?.isActive,
              }}
              onFinish={onFinish}
              className="flex gap-2 !mb-0"
            >
              <div className="w-full">
                <Form.Item className="w-full !mb-0" name="title">
                  <Input
                    //   onChange={(e) => console.log(e.target.value)}
                    defaultValue={item.title}
                    // onBlur={() => handleSave(index)}
                  />
                </Form.Item>
                <Form.Item
                  className="!mb-0"
                  name="isActive"
                  label="وضعیت"
                  valuePropName="checked"
                >
                  <Switch defaultChecked={item.isActive} />
                </Form.Item>
              </div>

              <Form.Item className="!mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center justify-center w-5"
                  //   onClick={onFinish}
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16.03 10.03a.75.75 0 1 0-1.06-1.06l-4.47 4.47l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z"
                      />
                    </svg>
                  </span>
                </Button>
              </Form.Item>
              <Form.Item className="!mb-0">
                <Button
                  onClick={handleCloseInput}
                  type="primary"
                  htmlType="button"
                  className="flex items-center justify-center w-5"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
                      />
                    </svg>
                  </span>
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div className="flex items-center justify-between px-2 py-4 border rounded-md bg-light-border border-middle-border">
              <div>
                <p>{item?.title}</p>
                <p className="mt-1 text-xs text-text-grade3">
                  {item?.isActive === true ? "فعال" : "غیرفعال"}
                </p>
              </div>
              <div className="flex gap-3">
                <span
                  className="cursor-pointer"
                  onClick={() => handleConvert(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M11.943 1.25H13.5a.75.75 0 0 1 0 1.5H12c-2.378 0-4.086.002-5.386.176c-1.279.172-2.05.5-2.62 1.069c-.569.57-.896 1.34-1.068 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386v-1.5a.75.75 0 0 1 1.5 0v1.557c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m4.827 1.026a3.503 3.503 0 0 1 4.954 4.953l-6.648 6.649c-.371.37-.604.604-.863.806a5.34 5.34 0 0 1-.987.61c-.297.141-.61.245-1.107.411l-2.905.968a1.492 1.492 0 0 1-1.887-1.887l.968-2.905c.166-.498.27-.81.411-1.107c.167-.35.372-.68.61-.987c.202-.26.435-.492.806-.863zm3.893 1.06a2.003 2.003 0 0 0-2.832 0l-.376.377c.022.096.054.21.098.338c.143.413.415.957.927 1.469a3.875 3.875 0 0 0 1.807 1.025l.376-.376a2.003 2.003 0 0 0 0-2.832m-1.558 4.391a5.397 5.397 0 0 1-1.686-1.146a5.395 5.395 0 0 1-1.146-1.686L11.218 9.95c-.417.417-.58.582-.72.76a3.84 3.84 0 0 0-.437.71c-.098.203-.172.423-.359.982l-.431 1.295l1.032 1.033l1.295-.432c.56-.187.779-.261.983-.358c.251-.12.49-.267.71-.439c.177-.139.342-.302.759-.718z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <Popconfirm
                  okText="بله"
                  cancelText="خیر"
                  title="آیا از حذف این عنوان اطمینان دارید؟"
                  onConfirm={() => handleDeleteItem(item?.id)}
                >
                  <span className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M5.117 7.752a.75.75 0 0 1 .798.698l.46 6.9c.09 1.347.154 2.285.294 2.99c.137.685.327 1.047.6 1.303c.274.256.648.422 1.34.512c.714.093 1.654.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095c.692-.09 1.066-.256 1.34-.512c.273-.256.463-.618.6-1.302c.14-.706.204-1.644.294-2.992l.46-6.899a.75.75 0 1 1 1.497.1l-.464 6.952c-.085 1.282-.154 2.319-.316 3.132c-.169.845-.455 1.551-1.047 2.104c-.591.554-1.315.793-2.17.904c-.822.108-1.86.108-3.145.108h-.88c-1.285 0-2.323 0-3.145-.108c-.855-.111-1.579-.35-2.17-.904c-.592-.553-.878-1.26-1.047-2.104c-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 0 1 .699-.798m5.238-5.502h-.046c-.216 0-.405 0-.583.028a2.25 2.25 0 0 0-1.64 1.183c-.084.16-.143.339-.211.544l-.015.044l-.097.29a1.25 1.25 0 0 1-1.263.91h-3a.75.75 0 1 0 0 1.501h17.001a.75.75 0 0 0 0-1.5H17.41a1.25 1.25 0 0 1-1.173-.91l-.097-.291l-.014-.044c-.069-.205-.128-.384-.211-.544a2.25 2.25 0 0 0-1.641-1.183a3.733 3.733 0 0 0-.583-.028h-.046zm-1.21 2.685c-.04.109-.085.214-.137.315h5.984a2.764 2.764 0 0 1-.136-.314l-.04-.114l-.099-.3a3.114 3.114 0 0 0-.133-.368a.75.75 0 0 0-.547-.395a3.114 3.114 0 0 0-.392-.009h-3.29c-.288 0-.348.002-.392.01a.75.75 0 0 0-.547.394c-.02.04-.042.095-.133.369l-.1.3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </Popconfirm>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Spin />
    </div>
  );
};

export default EditSubjectOfSurvey;
