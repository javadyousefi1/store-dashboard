import { Image, Modal, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const TableDetail = ({ rowData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        {/* button */}
        <Tooltip title="برای مشاهده ویرایش ها کلیک کنید">
          <Link to={{ pathname: "/versions", search: `id=${rowData?.id}` }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 4.67v12.07c0 .96-.78 1.86-1.74 1.98l-.33.04c-2.18.29-5.54 1.4-7.46 2.46-.26.15-.69.15-.96 0l-.04-.02c-1.92-1.05-5.27-2.15-7.44-2.44l-.29-.04C2.78 18.6 2 17.7 2 16.74V4.66c0-1.19.97-2.09 2.16-1.99 2.1.17 5.28 1.23 7.06 2.34l.25.15c.29.18.77.18 1.06 0l.17-.11c.63-.39 1.43-.78 2.3-1.13V8l2-1.33L19 8V2.78c.27-.05.53-.08.77-.1h.06c1.19-.1 2.17.79 2.17 1.99ZM12 5.49v15"
                stroke="var(--color-primary)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19 2.78V8l-2-1.33L15 8V3.92c1.31-.52 2.77-.94 4-1.14Z"
                stroke="var(--color-primary)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Link>
        </Tooltip>
      </div>
    </>
  );
};

export default TableDetail;
