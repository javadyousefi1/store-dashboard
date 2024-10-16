import { useState, useCallback, useEffect } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Upload, Tag, Form } from "antd";
import toast from "react-hot-toast";
import useFetch from "global/hooks/useFetch";
import { getAccidentById } from "@/api/accident";
import { createNewsFromAccident } from "@/api/news";
import Image from "global/antd-kit/image";
import { copyContent } from "global/utils/helpers";
import CKEditorComponent from "@/components/CKEditor";

interface NewsType {
  title: string;
  text: string;
  source: string;
  bannerFile: string;
  thumbnailFile: string;
  isActive: boolean;
  accidentId?: number;
}

interface RowData {
  id: number;
  createDate: string;
  title: string;
  description: string;
  occurrenceDate: string;
  result: string;
  isActive: boolean;
  province: {
    id: string;
    title: string;
  };
  city: {
    id: string;
    title: string;
  };
  district: {
    id: string;
    title: string;
  };
  town: {
    id: string;
    title: string;
  };
  address: string;
  checkNews: boolean;
  files: null;
  causeAccidents: null;
  incidentSuggestions: null;
}

const AddNewsFromAccident: React.FC<{
  hideModal: () => void;
  rowData: RowData;
  accidentId: number;
  handleRefreshTable: () => void;
}> = ({ hideModal, rowData, accidentId, handleRefreshTable }) => {
  const [form] = Form.useForm();
  const [bannerFile, setBannerFile] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [tag, setTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [editorData, setEditorData] = useState("");

  const getAccidentByIdAgain = useCallback(() => {
    return getAccidentById(rowData?.id);
  }, [rowData]);

  const { data: accidentData, loading } = useFetch(getAccidentByIdAgain);

  const onSubmit = async (values: NewsType) => {
    // if (tagList.length === 0) {
    //   toast.error("افزودن تگ اجباری است");
    //   return;
    // }

    if (editorData.trim() === "") {
      return toast.error("افزودن متن خبر اجباری است")
    }

    const loadingToast = toast.loading("در حال ثبت خبر جدید");
    const formData = new FormData();

    formData.append("accidentId", accidentId?.toString());
    formData.append("Title", values.title);
    values.source && formData.append("Source", values.source);
    // formData.append("Text", values.text);
    formData.append("Text", editorData);
    formData.append("bannerImg.File", values.bannerFile[0].originFileObj);
    formData.append("thumbnailImg.File", values.thumbnailFile[0].originFileObj);
    formData.append("isActive", values.isActive);
    tagList.forEach((item) => formData.append("Tags", item));

    try {
      await createNewsFromAccident(formData);
      toast.dismiss(loadingToast);
      toast.success("اخبار جدید با موفقیت ثبت شد");
      handleRefreshTable();
      hideModal();
      form.resetFields();
    } catch (err) {
      toast.error(err?.message || "ثبت خبر با خطا مواجه شد");
    }
  };

  const handleClickTag = () => {
    const value = tag;
    if (value && !tagList.includes(value)) {
      setTagList([...tagList, value]);
      setTag("");
    } else if (tagList.includes(value)) {
      toast.error("تگ تکراری است");
    }
  };

  const handleDeleteTag = (tagName: string) => {
    setTagList(tagList.filter((item) => item !== tagName));
  };

  const handleResetForm = () => {
    form.resetFields();
    setTag("");
    setTagList([]);
    setBannerFile([]);
    setThumbnailFile([]);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    form.setFieldValue("text",editorData)
  },[editorData])

  const handleDownload = (url: string, fileName: string) => {
    toast.success("در حال دانلود فایل...");
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //   useEffect(() => {
  //     if (!loading) {
  //       form.setFieldsValue({
  //         bannerFile: accidentData?.data?.files?.map((item) => ({
  //           uid: `-${item.id}`,
  //           name: item.path,
  //           status: "done",
  //           url: item.path,
  //         })),
  //         thumbnailFile: accidentData?.data?.files?.map((item) => ({
  //           uid: `-${item.id}`,
  //           name: item.path,
  //           status: "done",
  //           url: item.path,
  //         })),
  //       });
  //     }
  //   }, [form, loading]);

  return (
    <>
      <div className="bg-light-border border border-middle-border p-2 rounded-lg">
        <div className="overflow-y-auto h-48 grid grid-cols-1 gap-3">
          <h3 className="text-lg">حادثه</h3>
          <div>
            <span className="text-text-grade3 ml-2">عنوان:</span>
            <span>{rowData?.title}</span>
          </div>
          <div className="flex">
            <span className="text-text-grade3 ml-2">آدرس:</span>
            <span className="flex items-center gap-1">
              <svg
                className="cursor-pointer"
                onClick={() => copyContent(rowData?.address)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  fill-rule="evenodd"
                  d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399"
                  clip-rule="evenodd"
                />
              </svg>
              {rowData?.address}
            </span>
          </div>
          <div className="flex">
            <span className="text-text-grade3 ml-2">شرح حادثه:</span>
            <span className="flex items-center gap-1">
              <svg
                className="cursor-pointer"
                onClick={() => copyContent(rowData?.address)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  fill-rule="evenodd"
                  d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399"
                  clip-rule="evenodd"
                />
              </svg>
              {rowData?.description}
            </span>
          </div>
          <div className="flex">
            <span className=" text-text-grade3 ml-2">نتیجه:</span>
            <span className="flex items-center gap-1">
              <svg
                className="cursor-pointer"
                onClick={() => copyContent(rowData?.address)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  fill-rule="evenodd"
                  d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399"
                  clip-rule="evenodd"
                />
              </svg>
              {rowData?.result}
            </span>
          </div>
          <div className="flex gap-3">
            <p>{rowData?.province?.title}</p>
            <span className="text-text-placeholder">|</span>
            <p>{rowData?.town?.title}</p>
            <span className="text-text-placeholder">|</span>
            <p>{rowData?.district?.title}</p>
            <span className="text-text-placeholder">|</span>
            <p>{rowData?.city?.title}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {accidentData?.data?.files?.map((item) => (
              <div className="relative" key={item.id}>
                <Image
                  className="!object-cover !w-full !h-[160px] rounded-lg"
                  src={item?.path}
                />
                <span
                  onClick={() => handleDownload(item?.path, item?.path)}
                  className="absolute z-10 top-2 right-2 bg-white p-1 rounded-full cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.554 16.506a.75.75 0 0 1-1.107 0l-4-4.375a.75.75 0 0 1 1.107-1.012l2.696 2.95V3a.75.75 0 0 1 1.5 0v11.068l2.697-2.95a.75.75 0 1 1 1.107 1.013z"
                    />
                    <path
                      fill="currentColor"
                      d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982c.602-.602.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{ isActive: true }}
      >
        <div className="grid grid-cols-2 mt-5 gap-x-4">
          <Form.Item
            label="عنوان"
            name="title"
            rules={[{ required: true, message: "عنوان مورد نیاز است" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="منبع" name="source">
            <Input />
          </Form.Item>
          <Form.Item
            label="متن خبر"
            className="col-span-2"
            name="text"
            rules={[{ required: true, message:"متن خبر مورد نیاز است"}]}
          >
            <CKEditorComponent
              setEditorData={setEditorData}
              editorData={editorData}
            />

            {/* <Input.TextArea /> */}
          </Form.Item>

          <div>
            <Form.Item
              label="بنر (1 عدد)"
              name="bannerFile"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "بنر خبر مورد نیاز است" }]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                accept="image/png,image/jpeg"
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>بارگذاری بنر</Button>
              </Upload>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              label="پیش نمایش (1 عدد)"
              name="thumbnailFile"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: "پیش نمایش خبر مورد نیاز است" },
              ]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                accept="image/png,image/jpeg"
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>بارگذاری پیش نمایش</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item label="وضعیت" name="isActive">
            <Switch />
          </Form.Item>
          <div className="col-span-2">
            <Form.Item
              label="تگ ها"
              rules={[{ required: true, message: "افزودن تگ مورد نیاز است" }]}
            >
              <div className="flex gap-x-4">
                <Input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  // onKeyDown={handleKeyDown}
                />
                <Button
                  htmlType="button"
                  disabled={tag === ""}
                  onClick={handleClickTag}
                  className="flex items-center justify-center"
                >
                  <PlusOutlined />
                </Button>
              </div>
              <div className="flex flex-wrap max-h-[100px] overflow-y-scroll mt-2 gap-2">
                {tagList.map((item) => (
                  <Tag
                    color="blue"
                    closable
                    onClose={() => handleDeleteTag(item)}
                    key={item}
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-end col-span-2 gap-x-4">
            <Button onClick={hideModal}>انصراف</Button>
            <Button
              htmlType="submit"
              className="px-8"
              type="primary"
              loading={loading}
              disabled={loading}
            >
              ثبت
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
export default AddNewsFromAccident;
