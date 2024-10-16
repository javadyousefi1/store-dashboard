import { useState } from "react";
// api
import { getAllRss } from "@/api/rss";
// components
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
import Button from "global/antd-kit/button";
import Tooltip from "global/antd-kit/tooltip";
import RssForm from "./forms/RssForm";
import Table from "global/shared/table/Table";
import TableAction from "./TableAction";
import PageTitle from "global/shared/PageTitle";
import RssTableFilterComponent from "./RssTableFilterComponent";

const Rss = () => {
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

  return (
    <section>
      <PageTitle title=" RSS" />
      <PageHeader
        title=" RSS"
        leftSection={<MyButton onClick={showModal}>افزودن RSS جدید</MyButton>}
      />

      <Table
        tableId="RSS-link"
        className="mt-10"
        fetcher={getAllRss}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
          {
            eng: "url",
            translate: "آدرس",
            render(rowData) {
              return (
                <a
                  className="relative top-1"
                  href={rowData?.url}
                  target="_blank"
                >
                  <Tooltip title="برای مشاهده آدرس کلیک کنید">
                    <button>
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
                    </button>
                  </Tooltip>
                </a>
              );
            },
          },
          {
            eng: "checkNews",
            translate: "اتصال به اخبار",
            render(rowData) {
              return (
                  rowData?.checkNews ? (
                    <svg className="m-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#089205"
                        d="M16.03 10.03a.75.75 0 1 0-1.06-1.06l-4.47 4.47l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0z"
                      />
                      <path
                        fill="#089205"
                        fill-rule="evenodd"
                        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="m-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#D20707"
                        d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
                      />
                      <path
                        fill="#D20707"
                        fill-rule="evenodd"
                        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )
              );
            },
          },
        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
        FilterComponent={{
          component: RssTableFilterComponent,
          title: "فیلتر Rss",
        }}
      />

      <Modal
        width={700}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "0 16px" }}
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن  RSS جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        className="!w-[600px] md:!w-[800px]"
      >
        <RssForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Rss;
