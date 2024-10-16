import Button from "global/antd-kit/button";
import Form from "global/antd-kit/form/Form";
import { ReactNode } from "react";
import "@/index.css"

const SettingCard: React.FC<{
  title: string;
  icon: ReactNode;
  description: string;
  addButtonText?: string;
  editButtonText: string;
  addButtonOnClick? : () => void;
  editButtonOnClick : () => void;
}> = ({ icon, title, description, addButtonText, editButtonText, addButtonOnClick, editButtonOnClick }) => {
  return (
    <div className="bg-light-border rounded-lg border border-middle-border p-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-base text-text-primary">{title}</p>
        <span>{icon}</span>
      </div>
      <p className="text-sm text-text-grade3">{description}</p>
      {addButtonText ? (
        <div className="flex gap-2 items-center mt-4 justify-end">
          <Button onClick={addButtonOnClick} className="text-primary text-sm font-bold" type="text">{addButtonText}</Button>
          <span className="text-middle-border">|</span>
          <Button onClick={editButtonOnClick} className="text-primary text-sm font-bold" type="text">{editButtonText}</Button>
        </div>
      ) : (
        <div className="flex mt-4 justify-end">
          <Button onClick={editButtonOnClick} className="text-primary text-sm font-bold" type="text">{editButtonText}</Button>
        </div>
      )}
    </div>
  );
};

export default SettingCard;
