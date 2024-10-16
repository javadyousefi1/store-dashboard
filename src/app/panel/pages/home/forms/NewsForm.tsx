import { useState, useEffect } from "react";
import { PlusOutlined, UploadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Tag, Form } from "antd";
import Upload from "global/antd-kit/upload";
import toast from "react-hot-toast";
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

const NewsForm: React.FC<{
  hideModal: () => void;
  handleRefreshTable: () => void;
  accidentId?: number;
  rssId?: number;
  rowData: object;
  fetchFunction: (data: FormData) => Promise<void>;
}> = ({
  hideModal,
  handleRefreshTable,
  accidentId,
  fetchFunction,
  rssId,
  rowData,
}) => {
  const [bannerFile, setBannerFile] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState([]);
  const [tag, setTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("text",editorData)
  },[editorData])

  const onSubmit = (values: NewsType) => {
    // if (tagList.length === 0) return toast.error("افزودن تگ اجباری است");

    if (editorData.trim() === "") {
      return toast.error("افزودن متن خبر اجباری است")
    }

    setLoading(true);
    const loadingToast = toast.loading("در حال ثبت خبر جدید");
    const formData = new FormData();

    if (accidentId) formData.append("accidentId", accidentId?.toString());
    if (rssId) formData.append("RssId", rssId?.toString());

    formData.append("Title", values.title);
    values.source && formData.append("Source", values.source);
    formData.append("Text", editorData);
    if (thumbnailFile[0]) {
      formData.append("ThumbnailImg.File", thumbnailFile[0].originFileObj);
    }
    if (bannerFile[0]) {
      formData.append("BannerImg.File", bannerFile[0].originFileObj);
    }
    formData.append("isActive", values.isActive);

    tagList.forEach((item) => formData.append("Tags", item));

    fetchFunction(formData)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("اخبار جدید با موفقیت ثبت شد");
        handleRefreshTable();
        hideModal();
        handleResetForm();
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error(err?.message || "ثبت خبر با خطا مواجه شد");
      })
      .finally(() => setLoading(false));
  };

  const handleChangeBanner = (info) => {
    let newFileList = [...info.fileList].slice(-1);
    setBannerFile(newFileList);
  };

  const handleChangeThumbnail = (info) => {
    let newFileList = [...info.fileList].slice(-1);
    setThumbnailFile(newFileList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      if (value && !tagList.includes(value)) {
        setTagList([...tagList, value]);
        setTag("");
      } else if (tagList.includes(value)) {
        toast.error("تگ تکراری است");
      }
    }
  };

  const handleClickTag = () => {
    const value = tag;
    if (value && !tagList.includes(value)) {
      setTagList([...tagList, value]);
      setTag("");
    } else if (tagList.includes(value)) {
      setTag("");
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
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      initialValues={{
        isActive: false,
        source: rowData ? rowData?.url : "",
      }}
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
          <Input
            placeholder="می تواند یک متن یا یک آدرس  باشد"
            disabled={rowData?.url}
          />
        </Form.Item>
        {/* <Form.Item
          label="متن خبر"
          className="col-span-2"
          name="text"
          rules={[{ required: true, message: "متن خبر مورد نیاز است" }]}
        >
          <Input.TextArea />
        </Form.Item> */}
        <Form.Item
          label="متن خبر"
          // name="text"
          className="col-span-2"
          rules={[{ required: true, message: "متن خبر مورد نیاز است" }]}
        >
          <CKEditorComponent  setEditorData={setEditorData} editorData={editorData} />
        </Form.Item>
        <div>
          <Form.Item
            label="بنر"
            name="bannerFile"
            rules={[{ required: true, message: "بنر خبر مورد نیاز است" }]}
          >
            <Upload
              beforeUpload={(file) => {
                const isPNG = file.type.startsWith("image/");
                if (!isPNG) {
                  toast.error("فقط پسوند های عکس مورد تایید است");
                  return isPNG || Upload.LIST_IGNORE;
                } else {
                  return false;
                }
              }}
              maxCount={1}
              onChange={handleChangeBanner}
              fileList={bannerFile}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>بارگذاری بنر</Button>
            </Upload>
          </Form.Item>
          <div className="flex mt-3 gap-x-2">
              <QuestionCircleOutlined
                style={{ color: "var(--color-primary)" }}
              />
              <span>راهنما</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              سایز ایده‌آل برای عکس ( 340 * 900) می‌باشد
            </p>
        </div>
        <div>
          <Form.Item
            label="پیش نمایش"
            name="thumbnailFile"
            rules={[{ required: true, message: "پیش نمایش خبر مورد نیاز است" }]}
          >
            <Upload
              beforeUpload={(file) => {
                const isPNG = file.type.startsWith("image/");
                if (!isPNG) {
                  toast.error("فقط پسوند های عکس مورد تایید است");
                  return isPNG || Upload.LIST_IGNORE;
                } else {
                  return false;
                }
              }}
              maxCount={1}
              onChange={handleChangeThumbnail}
              fileList={thumbnailFile}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>بارگذاری پیش نمایش</Button>
            </Upload>
          </Form.Item>
          <div className="flex mt-3 gap-x-2">
              <QuestionCircleOutlined
                style={{ color: "var(--color-primary)" }}
              />
              <span>راهنما</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              سایز ایده‌آل برای عکس ( 140 * 220) می‌باشد
            </p>
        </div>
        <Form.Item label="وضعیت" name="isActive">
          <Switch />
        </Form.Item>
        <div className="col-span-2 mb-6">
          <div className="flex gap-x-4">
            <Input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
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
  );
};

export default NewsForm;
