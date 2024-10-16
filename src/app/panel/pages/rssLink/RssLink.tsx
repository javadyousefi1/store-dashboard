import { useState } from "react";
// api
import { getAllRssLinks } from "@/api/rssLink";
// components
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
import Tooltip from "global/antd-kit/tooltip";
import RssLinkForm from "./forms/RssLinkForm";
import Table from "global/shared/table/Table";
import { copyContent } from "global/utils/helpers";
import TableAction from "./TableAction";
import PageTitle from "global/shared/PageTitle";

const RssLink = () => {
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
      <PageTitle title="لینک RSS" />
      <PageHeader
        title="لینک RSS"
        leftSection={
          <MyButton onClick={showModal}>افزودن لینک RSS جدید</MyButton>
        }
      />

      <Table
        tableId="RSS-link"
        className="mt-10"
        fetcher={getAllRssLinks}
        columnConfig={[
          { eng: "title", translate: "عنوان" },

          {
            eng: "link",
            translate: "آدرس",
            render(rowData) {
              return (
                <div className="flex items-center justify-center gap-x-2">
                  <Tooltip title="کپی آدرس">
                    <button onClick={() => copyContent(rowData?.link)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          stroke="#111"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9z"
                        ></path>
                        <path
                          stroke="#111"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9z"
                        ></path>
                      </svg>
                    </button>
                  </Tooltip>
                  <span>{rowData?.link}</span>
                </div>
              );
            },
          },
        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        open={isModalOpen}
        title="افزودن لینک RSS جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <RssLinkForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default RssLink;
