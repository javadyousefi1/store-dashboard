// react
import { useState } from "react";
// components
import MyButton from "@/components/Button";
import TableAction from "./TableAction";
import ExamForm from "./forms/ExamForm";
// global features
import PageHeader from "global/shared/PageHeader";
import Modal from "global/antd-kit/modal";
import Table from "global/shared/table/Table";
import PageTitle from "global/shared/PageTitle";
import useFetch from "global/hooks/useFetch";
import { convertIsoToPersianDate } from "global/utils/helpers";
// api
import { apiGetAllExams } from "@/api/exam";
import { apiGetAllDegrees } from "@/api/degree";
// antd
import { Tag } from "antd";

const Exam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const { data: educationStage } = useFetch(apiGetAllDegrees);
  const options = educationStage?.data?.items;

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

  function getTimeDifference(isoTime) {
    const targetTime = new Date(isoTime); // Convert ISO time to Date object
    const currentTime = new Date(); // Get current time

    // Reset time part of both dates for accurate day comparison
    const targetDate = new Date(targetTime.getFullYear(), targetTime.getMonth(), targetTime.getDate());
    const currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

    const diffInMillis = targetDate - currentDate; // Calculate difference in milliseconds between dates
    const diffInDays = diffInMillis / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (diffInMillis < 0) {
      return `منقضی شده`;
    } else if (diffInDays === 1) {
      return `فردا زمان برگزاری آزمون است.`;
    } else if (diffInDays === 0) {
      return `روز موعود فرا رسید.`;
    } else {
      return `${diffInDays} روز مانده به زمان آزمون `;
    }
  }



  return (
    <section>
      <PageTitle title="آزمون" />
      <PageHeader
        title=" آزمون"
        leftSection={<MyButton onClick={showModal}>افزودن آزمون جدید</MyButton>}
      />
      <Table
        tableId="degree"
        className="mt-10"
        fetcher={apiGetAllExams}
        columnConfig={[
          // title
          { eng: "title", translate: "عنوان" },

          // education stage
          {
            eng: "educationStageId",
            translate: "مقطع",
            render(rowData) {
              const matchingOption = options?.find(
                (element) => element?.id === rowData?.educationStageId
              );
              return (
                <div
                  className="flex items-center justify-center"
                  title={matchingOption?.title}
                >
                  {matchingOption?.title}
                </div>
              );
            },
          },

          // date of exam
          {
            eng: "examDate",
            translate: "تاریخ آزمون",
            render(rowData) {
              const finalDate = rowData.examDate
                ? convertIsoToPersianDate(rowData.examDate)
                : "-";
              return (
                <div
                  className="flex items-center justify-center"
                  title={finalDate}
                >
                  {finalDate}
                </div>
              );
            },
          },

          // Time left to exam
          {
            eng: "examDate",
            translate: "مهلت آزمون",
            render(rowData) {
              return (
                <div className="flex items-center justify-center" title={getTimeDifference(rowData.examDate)}>
                  {getTimeDifference(rowData.examDate)}
                </div>
              );
            },
          },

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

          // // file
          // {
          //   eng: "file",
          //   translate: "فایل",
          //   render(rowData) {
          //     return (
          //       <div className="flex items-center justify-center">
          //         {rowData.filePath ? (
          //           <Tag color="green">دارد</Tag>
          //         ) : (
          //           <Tag color="red">ندارد</Tag>
          //         )}
          //       </div>
          //     );
          //   },
          // },
        ]}
        refreshTableFromParent={refreshTable}
        TableActionComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
      />

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="افزودن آزمون جدید"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        <ExamForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
        />
      </Modal>
    </section>
  );
};

export default Exam;
