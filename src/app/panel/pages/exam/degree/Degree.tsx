import { useState } from "react";
// components
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
// import RssForm from "./forms/RssForm";
import Table from "global/shared/table/Table";
// import TableAction from "./TableAction";
import PageTitle from "global/shared/PageTitle";
import TableAction from "./TableAction";
import DegreeForm from "./forms/DegreeForm";
import { apiGetAllDegrees } from "@/api/degree";
import { Tag } from "antd";

const Exam = () => {
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
      <PageTitle title="مقطع" />
      <PageHeader
        title=" مقطع"
        leftSection={<MyButton onClick={showModal}>افزودن مقطع جدید</MyButton>}
      />
      <Table
        tableId="degree"
        className="mt-10"
        fetcher={apiGetAllDegrees}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
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
        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن  مقطع جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <DegreeForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Exam;
