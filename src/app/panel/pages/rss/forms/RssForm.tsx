import React, { useState, useCallback } from "react";
// api
import { createNewRssLink, getAllRssLinks } from "@/api/rssLink";
import { getRssInfoByUrl, createNewRss } from "@/api/rss";
// interface
import { RssLinkObject, ServerDataResponse, ServerResult } from "@/interfaces";
// component
import Button from "global/antd-kit/button";
import Form from "global/antd-kit/form";
// toast
import toast from "react-hot-toast";
import Select from "global/antd-kit/select";
import Spin from "global/antd-kit/spin";
// hook
import useFetch from "global/hooks/useFetch";
import Empty from "global/antd-kit/empty";
import Typography from "global/antd-kit/typography";

import TableRss from "./RssTable";

type FieldType = {
  rssLinkId: number;
};

const RssForm: React.FC<{
  handleRefreshTable: () => void;
  hideModal: () => void;
  rowData?: RssLinkObject;
}> = ({ handleRefreshTable, hideModal, rowData }) => {
  const [form] = Form.useForm<FieldType>();
  const [selectedRssNewsData, setSelectedRssNewsData] = useState<
    RssLinkObject[]
  >([]);

  const handleSetSelectedRssNewsData = (data: RssLinkObject[]) =>
    setSelectedRssNewsData(data);

  const rrsLinkValue = Form.useWatch("rssLinkId", form);

  const fetchGetRssInfoByUrl = useCallback(() => {
    if (rrsLinkValue) return getRssInfoByUrl(rrsLinkValue);
  }, [rrsLinkValue]);

  const {
    data: rssInfoData,
    loading: rssInfoLoading,
    error,
  } = useFetch(fetchGetRssInfoByUrl);

  const { data, loading: rssLinkLoading } =
    useFetch<ServerResult<ServerDataResponse<RssLinkObject[]>>>(getAllRssLinks);

  const rssLinkOptions = data?.data?.items.map((item) => {
    return { value: item.id, label: item.title };
  });

  const [loading, setLoading] = useState(false);

  const onFinish = (values: FieldType) => {
    if (selectedRssNewsData.length === 0) {
      return toast.error("باید حداقل یک خبر انتخاب شود");
    }

    const payload = {
      rssLinkId: +values.rssLinkId,
      models: selectedRssNewsData,
    };

    setLoading(true);

    const loading = toast.loading("در حال ثبت RSS link جدید ...");

    createNewRss(payload)
      .then(() => {
        toast.success("ثبت  RSS جدید با موفقیت انجام شد");
        handleRefreshTable();
        hideModal();
      })
      .catch((err) => {
        toast.error(err?.message ?? "ثبت RSS  جدید با خطا مواجه شد");
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loading);
      });
  };

  return (
    <Form
      form={form}
      name="RSS"
      style={{ marginTop: "20px" }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="لینک RSS"
        name="rssLinkId"
        rules={[{ required: true, message: "لطفا یک RSS لینک را انتخاب کنید" }]}
      >
        <Select
          notFoundContent={<>لینک rss جدیدی در سامانه ثبت نشده است</>}
          loading={rssLinkLoading}
          disabled={rssLinkLoading}
          options={rssLinkOptions}
        />
      </Form.Item>

      {rssInfoLoading && (
        <div className="flex flex-col items-center justify-center my-12 gap-y-4">
          <Spin />
          <p>در حال دریافت اطلاعات RSS</p>
        </div>
      )}

      {!rssInfoLoading && rssInfoData && (
        <TableRss
          rssInfoData={rssInfoData}
          handleSetSelectedRssNewsData={handleSetSelectedRssNewsData}
        />
      )}

      <Form.Item>
        <div className="flex justify-end gap-4">
          <Button onClick={hideModal}>لغو</Button>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="px-8"
          >
            ثبت
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RssForm;
