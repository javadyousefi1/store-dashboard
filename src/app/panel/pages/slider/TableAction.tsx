// component
import Popconfirm from "global/antd-kit/popconfirm";
import Tooltip from "global/antd-kit/tooltip";
// types
import { sliderItemType } from "@/interfaces";
// loading
import toast from "react-hot-toast";
// api
import { deleteSlider } from "@/api/slider";
import Modal from "global/antd-kit/modal";
import { useState } from "react";
import EditSlider from "./forms/EditSlider";
import AddNewSlider from "./forms/AddNewSlider";

const TableAction: React.FC<{
  rowData: sliderItemType;
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
  const handleDeleteSlider = (id: number) => {
    const loadingToast = toast.loading("در حال حذف اسلایدر ");
    deleteSlider({ id: rowData.id })
      .then(() => {
        handleRefreshTable();
        toast.dismiss(loadingToast);
        toast.success("اسلایدر با موفقیت حذف شد");
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error("حذف اسلایدر با خطا مواجه شد");
      });
  };
  return (
    <div className="flex items-center justify-center gap-x-4">
      {/* delete */}
      <Tooltip title="حذف اسلایدر">
        <Popconfirm
          title="حذف اسلایدر"
          description="آیا از حذف اسلایدر اطمینان دارید"
          okText="بله"
          cancelText="خیر"
          onConfirm={() => handleDeleteSlider(rowData?.id)}
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

      {/* edit */}
      <Tooltip title="ویرایش اسلایدر">
        <button type="button" onClick={showModal}>
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.61666 16.2666C4.10832 16.2666 3.63332 16.0916 3.29166 15.7666C2.85832 15.3583 2.64999 14.7416 2.72499 14.075L3.03332 11.375C3.09166 10.8666 3.39999 10.1916 3.75832 9.82496L10.6 2.58329C12.3083 0.774959 14.0917 0.72496 15.9 2.43329C17.7083 4.14163 17.7583 5.92496 16.05 7.73329L9.20832 14.975C8.85832 15.35 8.20832 15.7 7.69999 15.7833L5.01666 16.2416C4.87499 16.25 4.74999 16.2666 4.61666 16.2666ZM13.275 2.42496C12.6333 2.42496 12.075 2.82496 11.5083 3.42496L4.66666 10.675C4.49999 10.85 4.30832 11.2666 4.27499 11.5083L3.96666 14.2083C3.93332 14.4833 3.99999 14.7083 4.14999 14.85C4.29999 14.9916 4.52499 15.0416 4.79999 15L7.48332 14.5416C7.72499 14.5 8.12499 14.2833 8.29166 14.1083L15.1333 6.86663C16.1667 5.76663 16.5417 4.74996 15.0333 3.33329C14.3667 2.69163 13.7917 2.42496 13.275 2.42496Z"
                fill="#444444"
              />
              <path
                d="M14.45 9.12504C14.4333 9.12504 14.4083 9.12504 14.3916 9.12504C11.7916 8.8667 9.69996 6.8917 9.29996 4.30837C9.24996 3.9667 9.48329 3.65004 9.82496 3.5917C10.1666 3.5417 10.4833 3.77504 10.5416 4.1167C10.8583 6.13337 12.4916 7.68337 14.525 7.88337C14.8666 7.9167 15.1166 8.22504 15.0833 8.5667C15.0416 8.88337 14.7666 9.12504 14.45 9.12504Z"
                fill="#444444"
              />
              <path
                d="M17.5 18.9584H2.5C2.15833 18.9584 1.875 18.675 1.875 18.3334C1.875 17.9917 2.15833 17.7084 2.5 17.7084H17.5C17.8417 17.7084 18.125 17.9917 18.125 18.3334C18.125 18.675 17.8417 18.9584 17.5 18.9584Z"
                fill="#444444"
              />
            </svg>
          </span>
        </button>
      </Tooltip>

      {/* edit modal */}
      <Modal
        destroyOnClose
        open={isModalOpen}
        title="ویرایش اسلایدر"
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
      >
        {/* add news form */}
        <AddNewSlider
          hideModal={hideModal}
          rowData={rowData}
          handleRefreshTable={handleRefreshTable}
        />
      </Modal>
    </div>
  );
};

export default TableAction;
