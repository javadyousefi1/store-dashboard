import { useState } from "react";
import SettingCard from "../components/SettingCard";
import Modal from "global/antd-kit/modal";
import { Collapse } from "antd";
import AddWorkPositionForm from "./add/AddWorkPositionSettingForm";
import AddFieldOfStudyForm from "../survey/AddSubjectOfSurvey";
import AddSubjectOfSurvey from "../survey/AddSubjectOfSurvey";
import EditWorkPositionSettingForm from "./edit/EditWorkPositionSettingForm";
import EditFieldOfStudySettingForm from "./edit/EditFieldOfStudy";

const AddInviteToWork: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWorkPositionInputVisible, setIsWorkPositionInputVisible] =
    useState(false);
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
    setIsWorkPositionInputVisible(false);
  };

  const handleUpdateEditionVersion = () => {
    setKey((prev) => prev + 1);
  };

  const addCollapseItems = [
    {
      key: "1",
      label: "افزودن سمت شغلی",
      children: (
        <AddWorkPositionForm
          handleCancelAddModal={handleCancelAddModal}
          handleUpdateEditionVersion={handleUpdateEditionVersion}
        />
      ),
    },
    {
      key: "2",
      label: "افزودن رشته تحصیلی",
      children: (
        <AddFieldOfStudyForm
          handleCancelAddModal={handleCancelAddModal}
          handleUpdateEditionVersion={handleUpdateEditionVersion}
        />
      ),
    },
  ];

  const editCollapseItems = [
    {
      key: "1",
      label: "ویرایش سمت شغلی",
      children: (
        <EditWorkPositionSettingForm
          isWorkPositionInputVisible={isWorkPositionInputVisible}
          setIsWorkPositionInputVisible={setIsWorkPositionInputVisible}
        />
      ),
    },
    {
      key: "2",
      label: "ویرایش رشته تحصیلی",
      children: (
        <EditFieldOfStudySettingForm
          isWorkPositionInputVisible={isWorkPositionInputVisible}
          setIsWorkPositionInputVisible={setIsWorkPositionInputVisible}
        />
      ),
    },
  ];

  return (
    <>
      {/* <button onClick={() => setKey((prev) => prev + 1)}>test</button> */}
      <SettingCard
        title=" دعوت به همکاری"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M18 3.25a.75.75 0 0 0 0 1.5c1.377 0 2.25.906 2.25 1.75S19.377 8.25 18 8.25a.75.75 0 0 0 0 1.5c1.937 0 3.75-1.333 3.75-3.25S19.937 3.25 18 3.25M6.75 4A.75.75 0 0 0 6 3.25c-1.937 0-3.75 1.333-3.75 3.25S4.063 9.75 6 9.75a.75.75 0 0 0 0-1.5c-1.376 0-2.25-.906-2.25-1.75S4.624 4.75 6 4.75A.75.75 0 0 0 6.75 4"
            />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 12.25c-1.784 0-3.434.48-4.659 1.297c-1.22.814-2.091 2.02-2.091 3.453c0 1.433.871 2.64 2.091 3.453c1.225.816 2.875 1.297 4.659 1.297c1.784 0 3.434-.48 4.659-1.297c1.22-.814 2.091-2.02 2.091-3.453c0-1.433-.872-2.64-2.091-3.453c-1.225-.816-2.875-1.297-4.659-1.297M6.75 17c0-.776.472-1.57 1.423-2.204c.947-.631 2.298-1.046 3.827-1.046c1.53 0 2.88.415 3.827 1.046c.951.634 1.423 1.428 1.423 2.204c0 .776-.472 1.57-1.423 2.204c-.947.631-2.298 1.046-3.827 1.046c-1.53 0-2.88-.415-3.827-1.046C7.222 18.57 6.75 17.776 6.75 17"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M19.267 13.84a.75.75 0 0 1 .894-.573c.961.211 1.828.592 2.472 1.119c.643.526 1.117 1.25 1.117 2.114c0 .865-.474 1.588-1.117 2.114c-.644.527-1.51.908-2.472 1.119a.75.75 0 0 1-.322-1.466c.793-.173 1.426-.472 1.844-.814c.418-.342.567-.677.567-.953c0-.276-.149-.61-.567-.953c-.418-.342-1.051-.64-1.844-.814a.75.75 0 0 1-.572-.894M3.84 13.267a.75.75 0 1 1 .32 1.466c-.792.173-1.425.472-1.843.814c-.418.342-.567.677-.567.953c0 .276.149.61.567.953c.418.342 1.051.64 1.844.814a.75.75 0 0 1-.322 1.466c-.962-.211-1.828-.592-2.472-1.119C.724 18.088.25 17.364.25 16.5c0-.865.474-1.588 1.117-2.114c.644-.527 1.51-.908 2.472-1.119"
            />
          </svg>
        }
        description="رشته تحصیلی و .. اینجا تعریف می شود"
        addButtonText="افزودن دعوت به همکاری"
        editButtonText="ویرایش دعوت به همکاری"
        addButtonOnClick={handleOpenAddModal}
        editButtonOnClick={handleOpenEditModal}
      />

      {/* add */}
      <Modal
        destroyOnClose
        title="تنظیمات دعوت به همکاری"
        centered
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        onOk={handleCancelAddModal}
        footer={[]}
      >
        <div className="mt-8">
          <Collapse
            accordion
            expandIconPosition="end"
            items={addCollapseItems}
          />
        </div>
      </Modal>

      {/* edit */}
      <Modal
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "0 16px",
        }}
        width={700}
        title="ویرایش دعوت به همکاری"
        centered
        open={isEditModalOpen}
        onCancel={handleCancelEditModal}
        onOk={handleCancelEditModal}
        footer={[]}
        key={key}
      >
        <div className="mt-8">
          <Collapse
            accordion
            expandIconPosition="end"
            items={editCollapseItems}
          />
        </div>
      </Modal>
    </>
  );
};
export default AddInviteToWork;
