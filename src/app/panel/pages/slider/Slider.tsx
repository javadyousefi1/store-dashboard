import { useEffect, useState } from "react";
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
import { getAllSliders } from "@/api/slider";
import TableDetail from "./TableDetail";
import TableAction from "./TableAction";
import AddNewSlider from "./forms/AddNewSlider";
import TableFitler from "./TableFilter";
import PageTitle from "global/shared/PageTitle";

const Slider = () => {
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
    <>
      <PageTitle title="اسلایدر" />
      <PageHeader
        title="اسلایدر"
        leftSection={
          <MyButton onClick={showModal}>افزودن اسلایدر جدید</MyButton>
        }
      />

      <Modal
        destroyOnClose
        open={isModalOpen}
        title="افزودن اسلایدر جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <AddNewSlider
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
      <Table
        tableId="news"
        className="mt-10"
        fetcher={getAllSliders}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
          // {
          //   eng: "createDate",
          //   translate: "تاریخ ایجاد",
          //   dateConfig: "dateAndTime",
          // },
          { eng: "isActive", translate: "وضعیت", boolean: true },
          { eng: "link", translate: "لینک به" },
        ]}
        searchAble={{ search: true, searchParam: "search" }}
        TableDetailComponent={TableDetail}
        TableActionComponent={TableAction}
        refreshTableFromParent={refreshTable}
        FilterComponent={{ component: TableFitler, title: "فیلتر اسلایدر" }}
      />
    </>
  );
};

export default Slider;
