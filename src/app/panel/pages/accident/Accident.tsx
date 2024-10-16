import { useState } from "react";
// compoent
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
// import AddCauseAccsidentForm from "./forms/AddCauseAccsidentForm";
import Table from "global/shared/table/Table";
import { getAllAccidents } from "@/api/accident";
import AddAccident from "./forms/AddAccident";
import { timestampToPersianDate } from "global/utils/helpers";
import TableAction from "./TableAction";
import AccidentTableFilter from "./AccidentTableFilter";
import PageTitle from "global/shared/PageTitle";

const Accident = () => {
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
    <section>
      <PageTitle title="حوادث" />
      <PageHeader
        title="حوادث"
        leftSection={<MyButton onClick={showModal}>افزودن حادثه جدید</MyButton>}
      />
      <Table
        tableId="news"
        className="mt-10"
        fetcher={getAllAccidents}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
          {
            eng: "province.",
            render: (rowData) => {
              return <>{rowData?.province?.title}</>;
            },
            translate: "استان",
          },
          {
            eng: "occurrenceDate",
            translate: "تاریخ اتفاق",
            dateConfig: "dateAndTime",
          },
          // { eng: "isActive", translate: "وضعیت", boolean: true },
          {
            eng: "checkNews",
            translate: "اتصال به اخبار",
            render: (rowData) => {
              return !rowData?.checkNews ? (
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#b91c1c"
                      d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
                    />
                    <path
                      fill="#b91c1c"
                      fill-rule="evenodd"
                      d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#15803d"
                      d="M16.03 10.03a.75.75 0 1 0-1.06-1.06l-4.47 4.47l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z"
                    />
                    <path
                      fill="#15803d"
                      fill-rule="evenodd"
                      d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              );
            },
          },
        ]}
        refreshTableFromParent={refreshTable}
        FilterComponent={{
          component: AccidentTableFilter,
          title: "فیلتر حوادث",
        }}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        width={700}
        destroyOnClose
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "0 16px" }}
        open={isModalOpen}
        centered
        title={
          <>
            <p>افزودن حادثه جدید</p>
            <p className="mt-1 text-xs font-medium">
              تاریخ تنظیم: {convertNowDateToPersian}
            </p>
          </>
        }
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        className="m-10"
      >
        <AddAccident
          handleRefreshTable={handleRefreshTable}
          handleOk={handleOk}
        />
      </Modal>
    </section>
  );
};

export default Accident;
