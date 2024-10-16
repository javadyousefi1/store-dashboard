// react
import { useState } from "react";
// components
import MyButton from "@/components/Button";
import TableAction from "./TableAction";
import GuidlineForm from "./forms/GuidlineForm";
// global features
import PageHeader from "global/shared/PageHeader";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
import PageTitle from "global/shared/PageTitle";
// antd
import { Tag, Tooltip } from "antd";
// api
import { apiGetAllGuideline } from "@/api/examItems";
import GuidelineFilter from "./GuidelineFilter";
import IconifyComp from "@/components/shared/IconifyComp";

const Guideline = () => {
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
      <PageTitle title="راهنما" />
      <PageHeader
        title=" راهنما"
        leftSection={<MyButton onClick={showModal}>افزودن راهنمای جدید</MyButton>}
      />
      <Table
        tableId="degree"
        className="mt-10"
        fetcher={apiGetAllGuideline}
        columnConfig={[
          // examTitle
          { eng: "examTitle", translate: "عنوان آزمون" },

          // title
          { eng: "title", translate: "عنوان" },



          // url for redirect
          // { eng: "url", translate: "آدرس" },
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
          // description
          { eng: "description", translate: "توضیحات" },

        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        FilterComponent={{ component: GuidelineFilter, title: "فیلتر راهنما" }}

        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن  راهنما"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <GuidlineForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Guideline;
