import { useState } from "react";
import SettingCard from "../components/SettingCard";
import Modal from "global/antd-kit/modal";
import ChangeSliderSettingForm from "./form/ChangeSliderSettingForm";

const SliderSetting: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <SettingCard
        title="تنظیمات اسلایدر"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
              <path d="M17.141 2.374c-.924-.124-2.1-.124-3.568-.124h-3.321c-1.467 0-2.644 0-3.568.124c-.957.128-1.755.401-2.388 1.032c-.66.658-.931 1.495-1.053 2.504l-.006.05l.003.195a3.76 3.76 0 0 0-.599.486c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433v.545c.001 1.625.013 2.957.153 4c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h4.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-.112c0-1.838 0-3.294-.153-4.433c-.158-1.172-.49-2.121-1.238-2.87a3.732 3.732 0 0 0-.772-.593v-.093l-.005-.045c-.122-1.009-.392-1.846-1.053-2.504c-.633-.63-1.43-.904-2.388-1.032M2.751 14.84c.003 1.475.022 2.58.139 3.45c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c.763-.102 1.281-.273 1.672-.535l-2.687-2.419a2.25 2.25 0 0 0-2.8-.168l-.297.21a2.75 2.75 0 0 1-3.526-.306l-4.29-4.29a1.55 1.55 0 0 0-2.117-.07zm15.527 2.201l2.588 2.33c.106-.296.186-.65.244-1.082c.138-1.027.14-2.382.14-4.289c0-1.907-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.109.807-.133 1.816-.138 3.135l.506-.443a3.05 3.05 0 0 1 4.165.139l4.29 4.29a1.25 1.25 0 0 0 1.602.138l.298-.21a3.75 3.75 0 0 1 4.665.281M5.354 4.47c-.24.239-.412.551-.526 1.053a8.5 8.5 0 0 1 .683-.119c1.14-.153 2.595-.153 4.433-.153h4.112c1.838 0 3.294 0 4.433.153c.171.023.337.05.5.081c-.115-.48-.285-.782-.518-1.015c-.308-.307-.737-.502-1.529-.608c-.813-.11-1.889-.111-3.424-.111h-3.211c-1.535 0-2.611.002-3.424.11c-.792.107-1.221.302-1.529.609" />
              <path d="M17.5 8.25a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5m0 1.5a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5" />
            </g>
          </svg>
        }
        description="مدت زمان چرخش و... اینجا تعریف می‌شود"
        editButtonText="تنظیم اسلایدر"
        editButtonOnClick={handleOpenAddModal}
      />
      <Modal
        destroyOnClose
        title="تنظیمات اسلایدر"
        centered
        open={isAddModalOpen}
        onCancel={handleCancelAddModal}
        onOk={handleCancelAddModal}
        footer={[]}
      >
        <ChangeSliderSettingForm handleCancelAddModal={handleCancelAddModal} />
      </Modal>
    </>
  );
};
export default SliderSetting;
