import { useState } from "react";
// type
import { sliderItemType } from "@/interfaces";
import Tooltip from "global/antd-kit/tooltip";
// antd
import { Image } from "antd";
import IconifyComp from "@/components/shared/IconifyComp";

const TableDetail: React.FC<{ rowData: sliderItemType }> = ({ rowData }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-between gap-x-2 ">
      {/* detail tool tip */}
      <Tooltip title="پیش نمایش اسلایدر">
        <button onClick={() => setVisible(true)}>
        <IconifyComp icon="eye" size="xl" />
        </button>
      </Tooltip>



      {/* image preview componenrt */}
      <Image
        style={{ display: "none" }}
        src={rowData?.imagePath}
        preview={{
          visible,
          scaleStep: 0.5,
          src: rowData?.imagePath,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </div>
  );
};

export default TableDetail;
