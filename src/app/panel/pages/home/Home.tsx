import { useState } from "react";
// componetns
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
// form
import NewsForm from "./forms/NewsForm";
// api
import { getAllNews } from "@/api/news";
import TableAction from "./TableAction";
import { addNews } from "@/api/news";
import { timestampToPersianDate } from "global/utils/helpers";
import TableFitler from "./TableFilter";
import { Form, Tag } from "antd";
import PageTitle from "global/shared/PageTitle";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRefreshTable = () => setRefreshTable((prev) => !prev);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const nowDate = Date.now();
  const convertNowDateToPersian = timestampToPersianDate(nowDate);

  return (
    <>
      <PageTitle title="اخبار" />
      <PageHeader
        title="اخبار"
        leftSection={<MyButton onClick={showModal}>ثبت اخبار جدید</MyButton>}
      />

      <Modal
        destroyOnClose
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0 16px",
        }}
        centered
        open={isModalOpen}
        width={700}
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        title={
          <>
            <p> ثبت اخبار جدید</p>
            <p className="mt-1 text-xs font-medium">
              تاریخ تنظیم: {convertNowDateToPersian}
            </p>
          </>
        }
      >
        {/* add news form */}
        <NewsForm
          fetchFunction={addNews}
          hideModal={hideModal}
          handleRefreshTable={handleRefreshTable}
        />
      </Modal>
      <Table
        tableId="news"
        className="mt-10"
        fetcher={getAllNews}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
          { eng: "view", translate: "تعداد بازدید" },
          {
            eng: "createDate",
            translate: "تاریخ ایجاد",
            dateConfig: "dateAndTime",
          },
          {
            eng: "isActive", translate: "وضعیت", render: (rowData) => {
              return <>{rowData?.isActive ? <Tag color="green">فعال</Tag> : <Tag color="red">غیر فعال</Tag>}</>
            }
          },
        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        FilterComponent={{ component: TableFitler, title: "فیلتر اخبار" }}
        searchAble={{ search: true, searchParam: "search" }}
      />
    </>
  );
};

export default Home;
