import PageHeader from "global/shared/PageHeader";
import PageTitle from "global/shared/PageTitle";
import { useCallback, useState } from "react";
import MyButton from "@/components/Button";
import { Empty, Modal, Spin } from "antd";
import VersionForm from "../forms/AddBook";
import VersionCarts from "./VersionCarts";
import useFetch from "global/hooks/useFetch";
import { getAllVersions } from "@/api/book";
import { useSearchParams } from "react-router-dom";

const Version = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  // const querys = window.location.pathname.split("/")[2]
  const querys = window.location.pathname

  let [searchParams, setSearchParams] = useSearchParams();

  const ParentId = Number(searchParams.get("id"))


  const fetcher = useCallback(() => {
    return getAllVersions({ParentId});
  }, [refreshTable]);

  const { data: versionData, loading } = useFetch(fetcher);

  console.log("versionData",versionData)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRefreshTable = () => setRefreshTable((prev) => !prev);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageTitle
        title="ویرایش ها
      "
      />
      <PageHeader
        title=" ویرایش ها
        "
        leftSection={<MyButton onClick={showModal}>تعریف ویرایش جدید</MyButton>}
        hasBack
      />

      {loading && (
        <div className="flex flex-col items-center justify-center mt-10 gap-y-5">
          <Spin />
          <p className="text-lg font-bold">در حال دریافت اطلاعات</p>
        </div>
      )}

      {!loading && versionData?.data?.items?.length === 0 && (
        <Empty className="mt-20" description="هیج ویرایش ای ثبت نشده است" />
      )}

      {/* version */}
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {!loading &&
          versionData?.data?.items?.length > 0 &&
          versionData?.data?.items?.map((item) => (
            <VersionCarts
              item={item}
              title={item.title}
              parentId={item.id}
              handleRefreshTable={handleRefreshTable}
            />
          ))}
      </div>
      {/* <VersionCarts /> */}

      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        title="تعریف ویرایش جدید"
        onCancel={hideModal}
        footer={[]}
      >
        <VersionForm
          handleRefreshTable={handleRefreshTable}
          hideModal={hideModal}
          type={5}
          parentId={ParentId}
        />
      </Modal>
    </>
  );
};

export default Version;
