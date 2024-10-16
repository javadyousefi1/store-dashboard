import { useState } from "react";
import SettingCard from "../components/SettingCard";
import Modal from "global/antd-kit/modal";
import AddAccidentCausedForm from "./AddAccidentCausedForm";
import EditAccidentCausedForm from "./EditAccidentCausedForm";

const AccidentCaused: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [key, setKey] = useState(0);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateEditionVersion = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <>
      <SettingCard
        title="علت حوادث"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 3.96 2.26a1.86 1.86 0 0 0-.465.369c-.102.12-.12.2-.12.246V13a.75.75 0 0 1-1.5 0v-1.25c0-.506.222-.916.477-1.217c.252-.297.566-.524.845-.689A1.124 1.124 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
            />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176"
              clip-rule="evenodd"
            />
          </svg>
        }
        description="علت حوادث اینجا تعریف می‌شود"
        addButtonText="افزودن علت حادثه"
        addButtonOnClick={handleOpenAddModal}
        editButtonOnClick={handleOpenEditModal}
        editButtonText="ویرایش علت حادثه"
      />
      <Modal
        destroyOnClose
        title="افزودن علت حادثه"
        centered
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        onOk={handleCancelAddModal}
        footer={[]}
      >
        <AddAccidentCausedForm
          handleCancelAddModal={handleCancelAddModal}
          handleUpdateEditionVersion={handleUpdateEditionVersion}
        />
      </Modal>

      {/* edit */}
      <Modal
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0 16px",
        }}
        destroyOnClose
        width={700}
        key={key}
        title="ویرایش علت حادثه"
        centered
        open={isEditModalOpen}
        onCancel={handleCancelEditModal}
        onOk={handleCancelEditModal}
        footer={[]}
      >
        <EditAccidentCausedForm />
      </Modal>
    </>
  );
};
export default AccidentCaused;
