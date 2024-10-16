import { useState } from "react";
import SettingCard from "../components/SettingCard";
import Modal from "global/antd-kit/modal";
import AddSubjectOfSurvey from "./AddSubjectOfSurvey";
import EditSubjectOfSurvey from "./EditSubjectOfSurvey";

const SurveySettingCard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubjectInputVisible, setIsSubjectInputVisible] = useState(false);
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
        title=" نظرسنجی"
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
              d="M11.292 3.308c-.394.514-.838 1.308-1.484 2.466l-.327.587l-.059.106c-.3.54-.555.998-.964 1.308c-.413.314-.917.427-1.503.559l-.114.026l-.636.144c-1.255.284-2.11.479-2.694.71c-.571.224-.691.409-.737.556c-.049.156-.05.395.29.937c.347.55.932 1.236 1.786 2.236l.434.507l.075.087c.403.47.739.862.893 1.358c.153.493.102 1.01.04 1.638l-.01.117l-.066.677c-.13 1.332-.216 2.25-.187 2.91c.03.66.169.842.28.926c.098.075.28.157.873-.013c.603-.172 1.405-.539 2.58-1.08l.596-.274l.109-.05c.545-.253 1.017-.471 1.533-.471s.988.218 1.533.47a2.8 2.8 0 0 0 .11.05l.595.275c1.175.541 1.977.908 2.58 1.08c.593.17.775.088.873.013c.111-.084.25-.267.28-.926c.03-.66-.058-1.578-.187-2.91l-.066-.677l-.01-.117c-.062-.628-.113-1.145.04-1.638c.154-.496.49-.888.893-1.358l.075-.087l.434-.507c.854-1 1.439-1.686 1.785-2.236c.341-.542.34-.78.291-.937c-.046-.147-.166-.332-.737-.556c-.585-.231-1.439-.426-2.694-.71l-.636-.144c-.039-.01-.077-.018-.114-.026c-.586-.132-1.09-.245-1.503-.559c-.41-.31-.663-.767-.964-1.308l-.058-.106l-.328-.587c-.646-1.158-1.09-1.952-1.484-2.466c-.393-.514-.594-.558-.708-.558c-.114 0-.315.044-.708.558m-1.19-.912C10.577 1.774 11.166 1.25 12 1.25s1.422.524 1.899 1.146c.468.612.965 1.503 1.572 2.592l.359.643c.392.704.493.854.619.95c.12.091.277.143 1.04.316l.7.158c1.176.266 2.145.485 2.85.763c.732.289 1.373.714 1.62 1.507c.244.785-.03 1.507-.454 2.18c-.412.655-1.07 1.425-1.874 2.365l-.475.555c-.517.604-.625.752-.676.915c-.051.167-.047.36.032 1.165l.071.738c.122 1.256.221 2.28.186 3.06c-.035.795-.215 1.557-.87 2.055c-.668.506-1.445.45-2.195.234c-.727-.208-1.633-.625-2.733-1.132l-.656-.302c-.718-.33-.871-.383-1.015-.383c-.144 0-.297.053-1.015.383l-.655.302c-1.101.507-2.007.924-2.734 1.132c-.75.215-1.527.272-2.194-.234c-.656-.498-.836-1.26-.871-2.054c-.035-.78.064-1.805.186-3.06l.072-.739c.078-.806.082-.998.03-1.165c-.05-.163-.158-.31-.675-.915l-.475-.555c-.803-.94-1.461-1.71-1.873-2.364c-.425-.674-.699-1.396-.455-2.181c.247-.793.888-1.218 1.62-1.507c.705-.278 1.674-.497 2.85-.763l.063-.014l.636-.144c.764-.173.92-.225 1.041-.317c.126-.095.227-.245.62-.949l.358-.643c.607-1.09 1.104-1.98 1.572-2.592"
              clip-rule="evenodd"
            />
          </svg>
        }
        description="موضوع نظرسنجی و .. اینجا تعریف می شود"
        addButtonText="افزودن موضوع"
        editButtonText="ویرایش موضوع"
        addButtonOnClick={handleOpenAddModal}
        editButtonOnClick={handleOpenEditModal}
      />

      {/* add */}
      <Modal
        destroyOnClose
        title="افزودن موضوع"
        centered        
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        onOk={handleCancelAddModal}
        footer={[]}
      >
        <AddSubjectOfSurvey
          handleUpdateEditionVersion={handleUpdateEditionVersion}
          handleCancelAddModal={handleCancelAddModal}
        />
      </Modal>

      {/* edit */}
      <Modal
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto", padding: "0 16px" }}
        width={700}
        key={key}
        destroyOnClose
        title="ویرایش موضوع"
        centered
        open={isEditModalOpen}
        onCancel={handleCancelEditModal}
        onOk={handleCancelEditModal}
        footer={[]}
      >
        <EditSubjectOfSurvey
          isSubjectInputVisible={isSubjectInputVisible}
          setIsSubjectInputVisible={setIsSubjectInputVisible}
        />
      </Modal>
    </>
  );
};
export default SurveySettingCard;
