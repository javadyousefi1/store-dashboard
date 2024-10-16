import { getAllInviteToWorks } from "@/api/inviteToWork";
import PageHeader from "global/shared/PageHeader";
import Table from "global/shared/table/Table";
import TableAction from "./TableAction";
import InviteToWorkTableFilter from "./InviteToWorkTableFilter";
import PageTitle from "global/shared/PageTitle";

const InviteToWork = () => {
  return (
    <>
      <PageTitle title="دعوت به همکاری" />
      <PageHeader title="دعوت به همکاری" />
      <Table
        cloumnLenght={4}
        tableId="news"
        className="mt-10"
        fetcher={getAllInviteToWorks}
        columnConfig={[
          { eng: "fullName", translate: "نام و نام خانوادگی" },
          { eng: "phoneNumber", translate: "شماره تماس" },
          {
            eng: "topic", translate: "مبحث ", render: (rowData) => {
              return <>{rowData?.topic || "-"}</>
            }
          },
          {
            eng: "createDate",
            translate: "تاریخ درخواست",
            dateConfig: "dateAndTime",
          },
          { eng: "nationalCode", translate: "کد ملی" },
          { eng: "nationalCode", translate: "شماره شناسنامه" },
          { eng: "fatherName", translate: "نام پدر" },
          {
            eng: "nationality",
            translate: "ملیت ",
            eNum: {
              1: "ایرانی",
            },
          },
          {
            eng: "militaryServiceStatus",
            translate: "وضعیت سربازی ",
            eNum: {
              1: "پایان خدمت",
              2: "عدم پایان خدمت",
              3: "معاف",
            },
          },
          {
            eng: "maritalStatus",
            translate: "وضعیت تاهل",
            eNum: {
              1: "متاهل",
              2: "مجرد",
            },
          },
          {
            eng: "postalCode",
            translate: "کد پستی",
          },
          {
            eng: "birthPlace",
            translate: "مکان تولد",
          },
          {
            eng: "birthDate",
            translate: "تاریخ تولد",
            dateConfig: "dateAndTime",
          },

          {
            eng: "address",
            translate: "آدرس",
          },
          {
            eng: "description",
            translate: "توضیحات",
          },
        ]}
        FilterComponent={{
          component: InviteToWorkTableFilter,
          title: "فیلتر دعوت به همکاری",
        }}
        TableDetailComponent={TableAction}
        searchAble={{ search: true, searchParam: "search" }}
        excelOutPut={"/InvitedOfCooperate/ExportExcel"}

      />
    </>
  );
};

export default InviteToWork;
