import { IconType, IconSize } from "@/types/icon";
import { icons, iconSize } from "@/constant/iconify";

interface IProps {
  icon: IconType;
  size: IconSize;
  className?: string;
  color?: string;
  title?: string;
}

const IconifyComp: React.FC<IProps> = ({
  icon,
  size,
  color,
  title,
  className,
}) => {
  return (
    <span
      className={`${icons[icon]} ${iconSize[size]} ${className}`}
      style={{ color }}
      title={title}
    ></span>
  );
};

export default IconifyComp;
