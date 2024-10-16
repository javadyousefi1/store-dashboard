import { getAllSurvey } from "@/api/survery";
import PageHeader from "global/shared/PageHeader";
import Table from "global/shared/table/Table";
import TableDetail from "./TableDetail";
import { memo } from "react";
import TableFitler from "./TableFilter";
import PageTitle from "global/shared/PageTitle";

const Survey = () => {
  return (
    <>
      <PageTitle title="نظرسنجی " />
      <PageHeader title="نظرسنجی " />
      <Table
        tableId="survey"
        className="mt-10"
        fetcher={getAllSurvey}
        columnConfig={[
          { eng: "fullName", translate: "نام و نام خانوادگی" },
          { eng: "phoneNumber", translate: "شماره تماس" },
          {
            eng: "subjectOfSurvey",
            translate: "موضوع نظرسنجی",
            render: (rowData) => {
              return (
                <div title={rowData?.subjectOfSurvey?.title}>
                  {rowData?.subjectOfSurvey?.title}
                </div>
              );
            },
          },
          { eng: "title", translate: "توضیحات" },
          {
            eng: "createDate",
            translate: "تاریخ ثبت",
            dateConfig: "dateAndTime",
          },
        ]}
        TableDetailComponent={TableDetail}
        FilterComponent={{ component: TableFitler, title: "فیلتر نظرسنجی" }}
        searchAble={{ search: true, searchParam: "search" }}
        excelOutPut={"/Survey/ExportExcel"}
      />
    </>
  );
};

export default memo(Survey);
