// component
import Popconfirm from "global/antd-kit/popconfirm";
import Tooltip from "global/antd-kit/tooltip";
// toast
import toast from "react-hot-toast";
// api
import { deleteRss } from "@/api/rss";
// interface
import { RssLinkObject } from "@/interfaces";
import { useState } from "react";
import Modal from "global/antd-kit/modal/Modal";
import { createNewsFromRss } from "@/api/news";
import NewsForm from "../home/forms/NewsForm";
import { timestampToPersianDate } from "global/utils/helpers";

const TableAction: React.FC<{
  rowData: RssLinkObject;
  handleRefreshTable: () => void;
}> = ({ rowData, handleRefreshTable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDeleteNews = () => {
    const loadingToast = toast.loading("در حال حذفRSS ");

    deleteRss(rowData.id)
      .then(() => {
        handleRefreshTable();
        toast.dismiss(loadingToast);
        toast.success(" RSS با موفقیت حذف شد");
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error("حذفRSS با موفقیت خطا مواجه شد");
      });
  };

  const currentDate = Date.now();
  const convertCurrentDateToPersian = timestampToPersianDate(currentDate);

  return (
    <div className="flex items-center justify-center gap-x-4">
      {/* delete */}
      <Tooltip title="حذفRSS">
        <Popconfirm
          title="حذفRSS"
          description="آیا از حذفRSS اطمینان دارید"
          okText="بله"
          cancelText="خیر"
          onConfirm={handleDeleteNews}
        >
          <button>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5001 5.60827C17.4834 5.60827 17.4584 5.60827 17.4334 5.60827C13.0251 5.16661 8.62505 4.99994 4.26672 5.44161L2.56672 5.60827C2.21672 5.64161 1.90839 5.39161 1.87505 5.04161C1.84172 4.69161 2.09172 4.39161 2.43339 4.35827L4.13339 4.19161C8.56672 3.74161 13.0584 3.91661 17.5584 4.35827C17.9001 4.39161 18.1501 4.69994 18.1167 5.04161C18.0917 5.36661 17.8167 5.60827 17.5001 5.60827Z"
                fill="#444444"
              />
              <path
                d="M7.08338 4.76663C7.05005 4.76663 7.01672 4.76663 6.97505 4.75829C6.64172 4.69996 6.40838 4.37496 6.46672 4.04163L6.65005 2.94996C6.78338 2.14996 6.96671 1.04163 8.90838 1.04163H11.0917C13.0417 1.04163 13.225 2.19163 13.35 2.95829L13.5334 4.04163C13.5917 4.38329 13.3584 4.70829 13.025 4.75829C12.6834 4.81663 12.3584 4.58329 12.3084 4.24996L12.125 3.16663C12.0084 2.44163 11.9834 2.29996 11.1 2.29996H8.91672C8.03338 2.29996 8.01672 2.41663 7.89172 3.15829L7.70005 4.24163C7.65005 4.54996 7.38338 4.76663 7.08338 4.76663Z"
                fill="#444444"
              />
              <path
                d="M12.675 18.9583H7.325C4.41666 18.9583 4.3 17.3499 4.20833 16.0499L3.66666 7.65827C3.64166 7.31661 3.90833 7.01661 4.25 6.99161C4.6 6.97494 4.89166 7.23327 4.91666 7.57494L5.45833 15.9666C5.55 17.2333 5.58333 17.7083 7.325 17.7083H12.675C14.425 17.7083 14.4583 17.2333 14.5417 15.9666L15.0833 7.57494C15.1083 7.23327 15.4083 6.97494 15.75 6.99161C16.0917 7.01661 16.3583 7.30827 16.3333 7.65827L15.7917 16.0499C15.7 17.3499 15.5833 18.9583 12.675 18.9583Z"
                fill="#444444"
              />
              <path
                d="M11.3834 14.375H8.6084C8.26673 14.375 7.9834 14.0917 7.9834 13.75C7.9834 13.4083 8.26673 13.125 8.6084 13.125H11.3834C11.7251 13.125 12.0084 13.4083 12.0084 13.75C12.0084 14.0917 11.7251 14.375 11.3834 14.375Z"
                fill="#444444"
              />
              <path
                d="M12.0834 11.0416H7.91675C7.57508 11.0416 7.29175 10.7583 7.29175 10.4166C7.29175 10.075 7.57508 9.79163 7.91675 9.79163H12.0834C12.4251 9.79163 12.7084 10.075 12.7084 10.4166C12.7084 10.7583 12.4251 11.0416 12.0834 11.0416Z"
                fill="#444444"
              />
            </svg>
          </button>
        </Popconfirm>
      </Tooltip>

      {/* rss */}
      {
        <Tooltip
          title={
            rowData?.checkNews
              ? "این Rss به اخبار اضافه شده است"
              : "افزودن خبر از Rss"
          }
          className={`${
            rowData?.checkNews ? "opacity-50 !cursor-not-allowed" : ""
          }`}
        >
          <button
            onClick={showModal}
            disabled={rowData?.checkNews}
            className={`${
              rowData?.checkNews ? "opacity-50 !cursor-not-allowed" : ""
            }`}
          >
            <svg
              className={`${
                rowData?.checkNews ? "opacity-50 !cursor-not-allowed" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#444444"
                fill-rule="evenodd"
                d="M10.945 1.25h2.11c1.367 0 2.47 0 3.337.117c.9.12 1.658.38 2.26.981c.298.299.512.636.667 1.01c.932.116 1.715.372 2.333.99c.602.602.86 1.36.982 2.26c.116.867.116 1.97.116 3.337v4.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26c-.618.618-1.4.874-2.333.991c-.155.373-.369.71-.667 1.009c-.602.602-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-2.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982a3.056 3.056 0 0 1-.667-1.009c-.932-.117-1.715-.373-2.333-.991c-.602-.602-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337v-4.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.618-.618 1.4-.874 2.333-.99a3.07 3.07 0 0 1 .667-1.01c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117M4.328 4.94c-.437.106-.71.26-.919.47c-.277.276-.457.664-.556 1.398c-.101.756-.103 1.757-.103 3.192v4c0 1.435.002 2.437.103 3.192c.099.734.28 1.122.556 1.399c.209.209.482.363.92.469c-.079-.812-.079-1.806-.079-3.005v-8.11c0-1.198 0-2.193.078-3.005m15.344 14.12c.437-.106.71-.26.919-.469c.277-.277.457-.665.556-1.4c.101-.754.103-1.755.103-3.19v-4c0-1.436-.002-2.437-.103-3.193c-.099-.734-.28-1.122-.556-1.399c-.209-.209-.482-.363-.92-.469c.079.812.079 1.807.079 3.005v8.11c0 1.198 0 2.193-.078 3.005M7.808 2.853c-.734.099-1.122.28-1.399.556c-.277.277-.457.665-.556 1.4C5.752 5.562 5.75 6.564 5.75 8v8c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h2c1.435 0 2.437-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191V8c0-1.435-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.277-.277-.665-.457-1.4-.556c-.754-.101-1.756-.103-3.191-.103h-2c-1.435 0-2.437.002-3.192.103M8.25 9A.75.75 0 0 1 9 8.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 9m0 4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </Tooltip>
      }

      {/* modal */}

      <Modal
        destroyOnClose
        width={700}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "0 16px" }}
        centered
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0 16px",
        }}
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        title={
          <>
            <p> ثبت اخبار جدید</p>
            <p className="mt-1 text-xs font-medium">
              تاریخ تنظیم: {convertCurrentDateToPersian}
            </p>
          </>
        }
      >
        <NewsForm
          fetchFunction={createNewsFromRss}
          rssId={rowData?.id}
          rowData={rowData}
          hideModal={hideModal}
          handleRefreshTable={handleRefreshTable}
        />
      </Modal>
    </div>
  );
};

export default TableAction;
