// react
import { useState } from "react";
// components
import MyButton from "@/components/Button";
import TableAction from "./TableAction";
import TestItemsForm from "./forms/TestItemsForm";
// global features
import PageHeader from "global/shared/PageHeader";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
import PageTitle from "global/shared/PageTitle";
// antd
import { Tag, Tooltip } from "antd";
// api
import { apiGetAllTestItems } from "@/api/examItems";
import IconifyComp from "@/components/shared/IconifyComp";
import TestItemsFilter from "./TestItemsFilter";

const TestItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  function handleRefreshTable() {
    setRefreshTable((prev) => !prev);
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function hideModal() {
    setIsModalOpen(false);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  return (
    <section>
      <PageTitle title="مواد آزمون" />
      <PageHeader
        title=" مواد آزمون"
        leftSection={<MyButton onClick={showModal}>افزودن مواد آزمون جدید</MyButton>}
      />
      <Table
        tableId="degree"
        className="mt-10"
        fetcher={apiGetAllTestItems}
        columnConfig={[
          // examTitle
          { eng: "examTitle", translate: "عنوان آزمون" },

          // title
          { eng: "title", translate: "عنوان" },

          // description
          { eng: "description", translate: "توضیحات" },

          // isActive
          {
            eng: "isActive",
            translate: "وضعیت",
            render(rowData) {
              return (
                <div className="flex items-center justify-center">
                  {rowData.isActive ? (
                    <Tag color="green">فعال</Tag>
                  ) : (
                    <Tag color="red">غیرفعال</Tag>
                  )}
                </div>
              );
            },
          },

          // file
          {
            eng: "filePath",
            translate: "فایل",
            render(rowData) {
              return (
                <div className="flex items-center justify-center">
                  {rowData?.filePath ? (
                    <Tooltip title="پیش نمایش">
                      <a href={rowData?.filePath} target="_blank">
                        <IconifyComp icon="eye" size="xl" color="var(--color-primary)" />
                      </a>
                    </Tooltip>
                  ) : (
                    <Tag color="red">ندارد</Tag>
                  )}
                </div>
              );
            },
          },
        ]}
        refreshTableFromParent={refreshTable}
        FilterComponent={{ title: "فیلتر مواد آزمون", component: TestItemsFilter }}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن مواد آزمون"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <TestItemsForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default TestItems;
