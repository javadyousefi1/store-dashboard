import { Button, Image, Tooltip } from "antd";
import Card from "global/antd-kit/card/Card";
import Divider from "global/antd-kit/divider";
import { convertIsoToPersianDateWithTime } from "global/utils/helpers";
import { useState, useCallback } from "react";
import useFetch from "global/hooks/useFetch";
import { getInviteToWorkById } from "@/api/inviteToWork";

const gradeList = [
  { label: "کارشناسی", value: 1 },
  { label: "کارشناسی ارشد", value: 2 },
  { label: "دکتری", value: 3 },
];
const typeOfActivityList = [
  { label: "رسمی", value: 1 },
  { label: "دیگر", value: 2 },
];

const ResearchActivitiesTypeList = [
  { label: "مقاله یا کتاب", value: 1 },
  { label: "کنفرانس", value: 2 },
];

const MoreDetail: React.FC<{ hideModal: () => void; rowData: object, id: number }> = ({
  rowData, id
}) => {


  const handleGetInviteToworkById = useCallback(() => {
    if (id) {
      return getInviteToWorkById(id);
    }
  }, [id]);

  const { data } = useFetch(handleGetInviteToworkById)
  
  const moreInfoData = data?.data
  console.log(moreInfoData)
  return (
    <>
      <Card type="inner" title="سوابق تحصیلی" className="mt-10">
        {moreInfoData?.educationalRecords?.length === 0 || !moreInfoData?.educationalRecords && (
          <p>اطلاعاتی ثبت نشده است</p>
        )}
        {data?.data?.educationalRecords?.map((item) => (
          <EducationalRecordsBox {...item} />
        ))}
      </Card>
      <Card type="inner" title="سوابق کاری" className="mt-10">
        {moreInfoData?.resume?.length === 0 || !moreInfoData?.resume && <p>اطلاعاتی ثبت نشده است</p>}
        {moreInfoData?.resume?.map((item) => (
          <ResumeBox {...item} />
        ))}
      </Card>
      <Card type="inner" title="سوابق پژوهشی" className="mt-10">
        {moreInfoData?.researchActivities?.length === 0 || !moreInfoData?.researchActivities && (
          <p>اطلاعاتی ثبت نشده است</p>
        )}
        {data?.data?.researchActivities?.map((item) => (
          <ResearchActivitiesBox {...item} />
        ))}
      </Card>

      <Card type="inner" title="افتخارات" className="mt-10">
        {moreInfoData?.honors?.length === 0 || !moreInfoData?.honors && <p>اطلاعاتی ثبت نشده است</p>}
        {moreInfoData?.honors?.map((item) => (
          <HonorsBox {...item} />
        ))}
      </Card>

      <Card type="inner" title="تخصص و مهارت های اجرایی" className="mt-10">
        {moreInfoData?.executiveSkills?.length === 0 || !moreInfoData?.executiveSkills && <p>اطلاعاتی ثبت نشده است</p>}
        {moreInfoData?.executiveSkills?.map((item) => (
          <ExecutiveSkillsBox {...item} />
        ))}
      </Card>
    </>
  );
};

export default MoreDetail;

const EducationalRecordsBox = ({
  grade,
  fieldOfStudy,
  fromDate,
  toDate,
  universityName,
  academicOrientation,
  documentFilePath,
}) => {
  const [visible, setVisible] = useState(false);

  console.log(documentFilePath);
  return (
    <div className="grid grid-cols-3 px-4 py-4 border rounded-lg gap-x-10 gap-y-5 border-middle-border">
      <div>
        <span>مقطع :</span>
        <span>{gradeList.find((item) => item.value === grade)?.label}</span>
      </div>
      <div>
        <span>نام دانشگاه :</span>
        <span>{universityName}</span>
      </div>
      <div>
        <span>رشته تحصیلی :</span>
        <span>{fieldOfStudy?.title}</span>
      </div>
      <div>
        <span>گرایش :</span>
        <span>{academicOrientation}</span>
      </div>
      <div>
        <span>از تاریخ :</span>
        <span>{convertIsoToPersianDateWithTime(fromDate)}</span>
      </div>
      <div>
        <span>تا تاریخ :</span>
        <span>{toDate ? convertIsoToPersianDateWithTime(toDate) : " - "}</span>
      </div>
      {documentFilePath && (
        <div className="flex items-center gap-x-3">
          <span>مدرک :</span>
          <Tooltip title="پیش نمایش مدرک">
            <Button onClick={() => setVisible(true)}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="m21.68 16.96-3.13-7.31c-1.06-2.48-3.01-2.58-4.32-.22l-1.89 3.41c-.96 1.73-2.75 1.88-3.99.33l-.22-.28c-1.29-1.62-3.11-1.42-4.04.43l-1.72 3.45C1.16 19.17 2.91 22 5.59 22h12.76c2.6 0 4.35-2.65 3.33-5.04ZM6.97 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="var(--color-primary)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </Button>
          </Tooltip>

          <Image
            style={{ display: "none" }}
            src={documentFilePath}
            preview={{
              visible,
              scaleStep: 0.5,
              src: documentFilePath,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

const HonorsBox = ({ competitionOrFestival, title, year }) => {
  return (
    <div className="grid grid-cols-3 px-4 py-4 border rounded-lg gap-x-10 gap-y-5 border-middle-border">
      <div>
        <span>مسابقه / جشنواره :</span>
        <span>{competitionOrFestival}</span>
      </div>
      <div>
        <span>عنوان :</span>
        <span>{title}</span>
      </div>
      <div>
        <span>سال :</span>
        <span>{year}</span>
      </div>
    </div>
  );
};
const ExecutiveSkillsBox = ({ title }) => {
  return (
    <div className="grid grid-cols-3 px-4 py-4 border rounded-lg gap-x-10 gap-y-5 border-middle-border">
      <div>
        <span> عنوان :</span>
        <span>{title}</span>
      </div>
    </div>
  );
};
const ResearchActivitiesBox = ({
  title,
  publisherOrOrganizer,
  time,
  researchActivitiesType,
}) => {
  return (
    <div className="grid grid-cols-3 px-4 py-4 border rounded-lg gap-x-10 gap-y-5 border-middle-border">
      <div>
        <span> عنوان :</span>
        <span>{title}</span>
      </div>
      <div>
        <span> نوع :</span>
        <span>
          {
            ResearchActivitiesTypeList.find(
              (item) => item?.value === researchActivitiesType
            )?.label
          }
        </span>
      </div>
      <div>
        <span> انتشارات / برگزار کننده :</span>
        <span>{publisherOrOrganizer}</span>
      </div>
      <div>
        <span> زمان :</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

const ResumeBox = ({
  companyName,
  workPosition,
  fromDate,
  toDate,
  insuranceHistory,
  typeOfActivity,
}) => {
  return (
    <div className="grid grid-cols-3 px-4 py-4 border rounded-lg gap-x-10 gap-y-5 border-middle-border">
      <div>
        <span>نام شرکت :</span>
        <span>{companyName}</span>
      </div>
      <div>
        <span>سابقه بیمه :</span>
        <span>{insuranceHistory}</span>
      </div>
      <div>
        <span>رشته تحصیلی :</span>
        <span>{workPosition?.title}</span>
      </div>
      <div>
        <span>نوع فعالیت :</span>
        <span>
          {
            typeOfActivityList.find((item) => item.value === typeOfActivity)
              ?.label
          }
        </span>
      </div>
      <div>
        <span>از تاریخ :</span>
        <span>{convertIsoToPersianDateWithTime(fromDate)}</span>
      </div>
      <div>
        <span>تا تاریخ :</span>
        <span>{toDate ? convertIsoToPersianDateWithTime(toDate) : " - "}</span>
      </div>
    </div>
  );
};
