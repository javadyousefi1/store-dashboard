import { useState } from "react";
// componetns
import Modal from "antd/es/modal/Modal";
import { Tooltip } from "antd";
import MoreDetail from "./MoreDetail";

const TableAction = ({ rowData }) => {
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

  return (
    <div className="flex items-center justify-center">
      <Tooltip title="جزئیات بیشتر">
        <button onClick={showModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
              stroke="#111"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M15.996 12h.01M11.995 12h.01M7.995 12h.008"
              stroke="#111"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </Tooltip>

      <Modal
        // width={700}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto", padding: "0 16px" }}
        open={isModalOpen}
        title="جزئیات"
        centered
        onOk={handleOk}
        onCancel={hideModal}
        footer={[]}
        className="!w-[800px] m-10"
      >
        <MoreDetail id={rowData?.id} hideModal={hideModal} rowData={rowData} />
      </Modal>
    </div>
  );
};

export default TableAction;
