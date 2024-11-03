import { Button } from "antd";
import IconifyComp from "./IconifyComp";

interface ButtonProps {
  type?: "link" | "text" | "default" | "primary" | "dashed";
  title: string;
  className?: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonComponent: React.FC<ButtonProps> = ({ title, className, type, handleClick }) => {
  return (
    <Button
      className={`flex justify-center items-center flex-row-reverse gap-x-4 rounded-[10px] p-5 ${className}`}
      type={type}
      onClick={handleClick}
    >
      <span>{title}</span>
      <IconifyComp icon="plus" size="small" />
    </Button>
  );
};

export default ButtonComponent;
