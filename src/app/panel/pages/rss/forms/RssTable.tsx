import React, { useState, useEffect } from "react";
import { Table, Button, Tooltip, Empty } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { RssApiResponse } from "@/interfaces";
type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  title: string;
  url: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "عنوان",
    dataIndex: "title",
  },
  {
    title: "آدرس",
    dataIndex: "url",
    width: 100,
    render: (text) => (
      <a href={text} target="_blank">
        <Tooltip title="برای مشاهده آدرس کلیک کنید">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"
                stroke="var(--color-primary)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"
                stroke="var(--color-primary)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Button>
        </Tooltip>
      </a>
    ),
  },
];

const TableRss: React.FC<{
  rssInfoData: { data: RssApiResponse[] } | null;
  handleSetSelectedRssNewsData: (data: RssLinkObject[]) => void;
}> = ({ rssInfoData, handleSetSelectedRssNewsData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data = rssInfoData?.data?.map((item, index) => {
    return { title: item.title, url: item.url, key: index, id: item.id };
  });

  useEffect(() => {
    const selectedRowData: RssApiResponse[] = [];

    if (rssInfoData) {
      selectedRowKeys.forEach((item) => {
        selectedRowData.push(rssInfoData?.data[item]);
      });
    }
    handleSetSelectedRssNewsData(selectedRowData);
  }, [selectedRowKeys]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  if (rssInfoData?.data?.length === 0) {
    return (
      <>
        <Empty description="هیچ خبری یافت نشد" />
      </>
    );
  }

  return (
    <Table
      //   bordered
      title={() => `تعداد کل : ${data?.length}`}
      className="mb-10 "
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data ?? []}
      pagination={false}
      scroll={{ y: 300 }}
    />
  );
};

export default TableRss;
