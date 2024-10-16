import { useEffect, useState } from "react";
// compoent
import Upload from "antd/es/upload/Upload";
import Button from "global/antd-kit/button";
import Input from "global/antd-kit/input";
import TextArea from "global/antd-kit/input/TextArea";
import { Controller, useForm } from "react-hook-form";

import Switch from "global/antd-kit/switch";
import Tag from "global/antd-kit/tag";
import Form from "global/antd-kit/form";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
// toast
import toast from "react-hot-toast";
// validator
import { yupResolver } from "@hookform/resolvers/yup";
import { newsFormSchema } from "@/validator/yup";
// api
import { addNews, getAllNewsById, updateNews } from "@/api/news";
import Spin from "global/antd-kit/spin";
import CKEditorComponent from "@/components/CKEditor";

interface NewsType {
  title: string;
  text: string;
  source: string;
  bannerFile: string;
  thumbnailFile: string;
  isActive: boolean;
}
interface NewsGetByIdType {
  id: number;
  createDate: string;
  title: string;
  source: string;
  text: string;
  isActive: boolean;
  banner: Banner;
  thumbnail: null;
  tags: Tag[];
}

interface Tag {
  id: number;
  title: string;
}

interface Banner {
  id: number;
  path: string;
  file: null;
}
const EditNewsForm: React.FC<{
  hideModal: () => void;
  handleRefreshTable: () => void;
  rowData: any;
}> = ({ hideModal, handleRefreshTable, rowData }) => {
  const [form] = Form.useForm();
  const [bannerFile, setBannerFile] = useState<File[] | null>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [mountingLoading, setMountingLoading] = useState(false);
  const [tag, setTag] = useState<string>("");
  const [editorData, setEditorData] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    if (bannerFile?.length === 0) {
      resetField("bannerFile");
    }
    if (thumbnailFile?.length === 0) {
      resetField("thumbnailFile");
    }
  }, [bannerFile, thumbnailFile]);


  useEffect(() => {
    setMountingLoading(true);

    getAllNewsById({ id: rowData.id })
      .then(({ data }) => {
        // if (!loading) {
          setEditorData(data?.text ?? "")
        form.setFieldsValue({
          title: data?.title,
          source: data?.source,
          text: data?.text,
          isActive: data?.isActive,
          banner: [
            {
              uid: `-${data?.banner?.id}`,
              name: "",
              status: "done",
              url: data?.banner?.path,
            },
          ],
          thumbnail: [
            {
              uid: `-${data?.thumbnail?.id}`,
              name: "",
              status: "done",
              url: data?.thumbnail?.path,
            },
          ],
        });
        const list = data.tags.map((item: any) => item.title);
        setTagList(list);
        // }
      })
      .catch((err) => {
        toast.error(err?.message || "خطا در دریافت اطلاعات اخبار");
        setMountingLoading(false);
      })
      .finally(() => setMountingLoading(false));
  }, [form]);

  useEffect(() => {
    form.setFieldValue("text",editorData)
  },[editorData])

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    resetField,
    formState: { isValid },
  } = useForm<NewsType>({
    defaultValues: {
      isActive: false,
    },
    // resolver: yupResolver(newsFormSchema),
  });

  const handleClickTag = () => {
    const value = tag;
    if (value && !tagList.includes(value)) {
      setTagList([...tagList, value]);
      setTag("");
    } else if (tagList.includes(value)) {
      toast.error("تگ تکراری است");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };


  const onSubmit = (values: NewsType) => {

    // if (tagList.length === 0) return toast.error("افزودن تگ اجباری است");

    if (editorData.trim() === "") {
      return toast.error("افزودن متن خبر اجباری است")
    }


    setLoading(true);
    const loadingToast = toast.loading("در حال ثبت خبر جدید");
    const formData = new FormData();
    formData.append("id", rowData.id);
    formData.append("Title", values.title);
    values.source && formData.append("Source", values.source);
    formData.append("Text", editorData);

    const bannerOptimization = values.banner.map((item) => {
      if (item?.originFileObj) {
        return item?.originFileObj;
      } else {
        return item?.url;
      }
    });

    const thumbnailOptimization = values.thumbnail.map((item) => {
      if (item?.originFileObj) {
        return item?.originFileObj;
      } else {
        return item?.url;
      }
    });

    
    bannerOptimization.forEach((item) => {
      if(item?.lastModified) {
        formData.append("BannerImg.File", item);
      } else {
        formData.append("BannerImg.Path", item);
      }
    });

    thumbnailOptimization.forEach((item) => {
      if(item?.lastModified) {
        formData.append("thumbnailImg.File", item);
      } else {
        formData.append("thumbnailImg.Path", item);
      }
    });

    formData.append("isActive", values.isActive);

    tagList.forEach((item) => formData.append("Tags", item));

    updateNews(formData)
      .then(() => {
        toast.success("اخبار با موفقیت ویرایش شد");
        handleRefreshTable();
        hideModal();
        handleResetForm();
      })
      .catch((err) => {
        toast.error(err?.message || "ویرایش خبر با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(loadingToast);
      });
  };

  const handleChangeBanner = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setBannerFile(newFileList);
  };

  const handleChangeThumbnail = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setThumbnailFile(newFileList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      const trimedValue = value.trim();
      if (trimedValue === "") return;
      e.preventDefault(); // Prevent form submission

      if (tagList.includes(trimedValue)) {
        toast.error("تگ تکراری است");
        return;
      }
      setTagList((prev) => [...prev, trimedValue]);
      setTag("");
    }
  };

  const handleDeleteTag = (tagName: string) => {
    setTagList((prev) => prev.filter((item) => item !== tagName));
  };

  const handleResetForm = () => {
    reset();
    setTag("");
    setTagList([]);
    setBannerFile([]);
    setThumbnailFile([]);
  };

  return !mountingLoading ? (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      initialValues={{ isActive: false }}
    >
      <div className="grid grid-cols-2 mt-5 gap-x-4">
        <Form.Item
          label="عنوان"
          name="title"
          rules={[{ required: true, message: "عنوان مورد نیاز است" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="منبع"
          name="source"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="متن خبر"
          className="col-span-2"
          name="text"
          rules={[{ required: true, message: "متن خبر مورد نیاز است" }]}
        >
        <CKEditorComponent  setEditorData={setEditorData} editorData={editorData} />

          {/* <Input.TextArea /> */}
        </Form.Item>
        <div>
          <Form.Item
            label="بنر"
            name="banner"
            getValueFromEvent={normFile}
            valuePropName="fileList"
            rules={[{ required: true, message: "بنر خبر مورد نیاز است" }]}
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              maxCount={1}
              accept="image/png,image/jpeg"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>بارگذاری بنر</Button>
            </Upload>
          </Form.Item>
        </div>
        <div>
          <Form.Item
            label="پیش نمایش"
            name="thumbnail"
            getValueFromEvent={normFile}
            valuePropName="fileList"
            rules={[{ required: true, message: "پیش نمایش خبر مورد نیاز است" }]}
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              maxCount={1}
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
            // rules={[{ required: true, message: "افزودن تگ مورد نیاز است" }]}
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
  ) : (
    <Spin />
  );


};

export default EditNewsForm;