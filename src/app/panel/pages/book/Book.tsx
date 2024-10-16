import { useState } from "react";
// api
import { getAllRss } from "@/api/rss";
// components
import PageHeader from "global/shared/PageHeader";
import MyButton from "@/components/Button";
import Modal from "global/antd-kit/modal";
import Button from "global/antd-kit/button";
import Tooltip from "global/antd-kit/tooltip";
// import RssForm from "./forms/RssForm";
import Table from "global/shared/table/Table";
// import TableAction from "./TableAction";
import PageTitle from "global/shared/PageTitle";
import { getAllVersions } from "@/api/book";
import AddBook from "./forms/AddBook";
import TableAction from "./TableAction";
import { Link } from "react-router-dom";
import TableDetail from "./TableDetail";
import AddBookWithFile from "./forms/AddBookWithFile";
import { Image } from "antd";
import TableFitler from "./TableFilter";

const Book = () => {
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
      <PageTitle title="کتاب" />
      <PageHeader
        title=" کتاب"
        leftSection={<MyButton onClick={showModal}>افزودن کتاب جدید</MyButton>}
      />

      <Table
        tableId="book"
        className="mt-10"
        fetcher={getAllVersions}
        columnConfig={[
          { eng: "title", translate: "عنوان" },
          {
            eng: "filePath",
            translate: "پیش نمایش کتاب",
            render(rowData) {
              return (
                <div className="flex items-center justify-center">
                  <ImagePreview path={rowData?.filePath} />
                </div>
              );
            },
          },
          {
            eng: "createDate",
            translate: "تاریخ ایجاد",
            dateConfig: "dateAndTime",
          },
        ]}
        refreshTableFromParent={refreshTable}
        TableDetailComponent={TableDetail}
        TableActionComponent={TableAction}
        FilterComponent={{component: TableFitler, title:"فیلتر کتاب"}}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        // width={700}
        // bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "0 16px" }}
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن  کتاب جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        // className="!w-[600px] md:!w-[800px]"
      >
        <AddBookWithFile
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Book;

const ImagePreview = ({ path }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-center"
        onClick={() => setVisible(true)}
      >
        <img src={path} className="object-cover w-8 h-8 rounded-full" />
      </button>
      {/* image preview componenrt */}
      <Image
        style={{ display: "none" }}
        src={path}
        preview={{
          visible,
          scaleStep: 0.5,
          src: path,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};
