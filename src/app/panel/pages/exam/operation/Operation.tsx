// react
import { useState } from "react";
// components
import MyButton from "@/components/Button";
import TableAction from "./TableAction";
import OperationForm from "./forms/OperationForm";
// global features
import PageHeader from "global/shared/PageHeader";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
import PageTitle from "global/shared/PageTitle";
// antd
import { Tag } from "antd";
// api
import { apiGetAllOperation } from "@/api/examItems";
import OperationFilter from "./OperationFilter";

const Operation = () => {
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
      <PageTitle title="عملیات" />
      <PageHeader
        title=" عملیات"
        leftSection={<MyButton onClick={showModal}>افزودن عملیات جدید</MyButton>}
      />
      <Table
        tableId="degree"
        className="mt-10"
        fetcher={apiGetAllOperation}
        columnConfig={[
          // examTitle
          { eng: "examTitle", translate: "عنوان عملیات" },

          // title
          { eng: "title", translate: "عنوان" },

          // url for redirect
          { eng: "url", translate: "آدرس" },



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
          // description
          { eng: "description", translate: "توضیحات" },
        ]}
        refreshTableFromParent={refreshTable}
        FilterComponent={{ title: "فیلتر عملیات", component: OperationFilter }}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن عملیات جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <OperationForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Operation;
