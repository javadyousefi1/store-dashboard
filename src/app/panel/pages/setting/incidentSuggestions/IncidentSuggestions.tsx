import { useState } from "react";
import SettingCard from "../components/SettingCard";
import Modal from "global/antd-kit/modal";
import AddIncidentSuggestionsForm from "./AddIncidentSuggestionsForm";
import EditIncidentSuggestionsForm from "./EditIncidentSuggestionsForm";
import Form from "global/antd-kit/form";

const IncidentSuggestions: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [key, setKey] = useState(0);

  const [form] = Form.useForm();

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddModal = () => {
    setIsAddModalOpen(false);
    form.resetFields();
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
        title="پیشنهادات"
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
              d="M12 2.75a6.25 6.25 0 1 0 0 12.5a6.25 6.25 0 0 0 0-12.5M4.25 9a7.75 7.75 0 1 1 15.025 2.677l2.288 2.368c.257.267.471.489.631.674c.158.182.32.39.415.632c.334.845.066 1.845-.739 2.337c-.23.142-.494.2-.72.238c-.232.04-.526.07-.873.107l-.024.002c-.459.049-.546.064-.605.087a.683.683 0 0 0-.397.417c-.026.07-.041.173-.088.644l-.002.022c-.036.361-.066.664-.103.902c-.036.23-.09.494-.223.725c-.47.822-1.459 1.13-2.317.767c-.241-.102-.446-.273-.62-.435c-.18-.166-.393-.388-.65-.655l-.02-.02L12 17.09l-3.232 3.405l-.015.015c-.257.267-.471.489-.65.655c-.175.162-.38.333-.62.435c-.86.363-1.848.055-2.318-.767c-.132-.231-.187-.494-.223-.726c-.037-.237-.067-.54-.102-.9l-.003-.023c-.046-.471-.062-.573-.087-.644a.683.683 0 0 0-.397-.417c-.06-.023-.147-.038-.606-.087l-.023-.002c-.347-.037-.641-.068-.873-.107c-.226-.037-.49-.096-.721-.238c-.804-.492-1.072-1.492-.739-2.337c.096-.242.257-.45.415-.632c.16-.185.374-.407.632-.674l2.287-2.368A7.735 7.735 0 0 1 4.25 9m1.178 4.109l-1.896 1.963c-.276.286-.462.478-.592.629a1.21 1.21 0 0 0-.154.2c-.09.23 0 .424.119.503c.009.003.06.02.194.043c.18.03.43.057.806.097l.075.008c.34.035.641.067.91.17c.599.23 1.057.71 1.272 1.312c.096.269.126.573.16.927l.008.075c.038.389.064.649.094.84c.026.162.046.214.047.217c.08.135.244.201.425.125c0 0 .05-.027.186-.154c.145-.134.33-.325.605-.61l.002-.002l2.72-2.866a7.758 7.758 0 0 1-4.981-3.477m8.163 3.478a7.758 7.758 0 0 0 4.982-3.478l1.896 1.963c.276.286.461.478.591.629c.123.14.151.195.154.2c.09.23 0 .424-.118.503c-.01.003-.06.02-.194.043c-.181.03-.43.057-.807.097l-.075.008c-.339.035-.641.067-.91.17c-.598.23-1.057.71-1.272 1.312c-.096.269-.126.573-.16.927l-.008.075c-.038.389-.064.649-.094.84c-.025.162-.046.214-.046.217c-.08.135-.245.202-.427.125h.002s-.05-.027-.187-.154a17.01 17.01 0 0 1-.605-.61l-.002-.002zm-1.59-9.553c-.059.101-.124.217-.2.354l-.098.176a4.966 4.966 0 0 0-.022.04c-.079.144-.209.382-.426.547c-.221.168-.488.226-.643.26l-.043.009l-.191.043c-.176.04-.318.072-.44.103c.079.097.182.219.316.376l.13.152l.03.034c.108.125.283.325.363.585c.08.256.052.52.035.686a3.802 3.802 0 0 0-.005.047l-.02.203a22.63 22.63 0 0 0-.041.46c.104-.046.222-.1.363-.165l.179-.082l.04-.02c.144-.067.394-.184.672-.184c.279 0 .528.117.672.185l.04.019l.18.082c.14.065.258.12.363.165a35.76 35.76 0 0 0-.042-.46l-.02-.203a3.802 3.802 0 0 0-.005-.047c-.017-.167-.044-.43.035-.686c.08-.26.255-.46.363-.585l.03-.034l.13-.152c.134-.157.237-.279.317-.376c-.122-.03-.265-.063-.44-.103l-.191-.043l-.043-.01c-.156-.033-.422-.091-.644-.26c-.217-.164-.347-.402-.425-.545l-.023-.041l-.098-.176c-.076-.137-.14-.253-.199-.354M11.013 5.8c.172-.225.485-.55.986-.55c.502 0 .815.325.987.55c.164.214.33.511.5.816l.022.041l.099.177l.056.1l.099.023l.19.043l.048.01c.328.075.653.148.903.247c.277.109.65.32.795.785c.142.455-.037.841-.193 1.09c-.145.23-.364.486-.59.749l-.03.035l-.13.153l-.082.097l.012.135l.02.203l.004.046c.035.352.068.692.055.964c-.012.286-.08.718-.468 1.011c-.4.304-.84.238-1.12.157c-.258-.073-.562-.214-.87-.355l-.043-.02l-.179-.083a31.303 31.303 0 0 0-.085-.039l-.085.04l-.178.082l-.044.02c-.307.141-.612.282-.87.355c-.28.08-.72.147-1.12-.157c-.387-.293-.455-.725-.468-1.01c-.012-.273.02-.613.055-.965l.005-.046l.02-.203l.012-.135a9.946 9.946 0 0 0-.083-.097l-.13-.153l-.03-.035c-.225-.263-.445-.52-.59-.75c-.156-.248-.334-.634-.193-1.09c.145-.463.519-.675.795-.784c.25-.099.576-.172.904-.246l.046-.01l.191-.044l.1-.023l.056-.1l.098-.177l.023-.041c.17-.305.335-.602.5-.816"
              clip-rule="evenodd"
            />
          </svg>
        }
        description="پیشنهادات حوادث اینجا تعریف می‌شود"
        addButtonText="افزودن پیشنهاد"
        addButtonOnClick={handleOpenAddModal}
        editButtonOnClick={handleOpenEditModal}
        editButtonText="ویرایش پیشنهاد"
      />

      {/* add */}
      <Modal
        destroyOnClose
        title="افزودن پیشنهاد"
        centered
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        onOk={handleCancelAddModal}
        footer={[]}
      >
        <AddIncidentSuggestionsForm
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
        width={700}
        key={key}
        title="ویرایش پیشنهاد"
        centered
        destroyOnClose
        open={isEditModalOpen}
        onCancel={handleCancelEditModal}
        onOk={handleCancelEditModal}
        footer={[]}
      >
        <EditIncidentSuggestionsForm />
      </Modal>
    </>
  );
};
export default IncidentSuggestions;
