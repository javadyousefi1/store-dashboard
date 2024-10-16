import { SurveyObjectResponseType } from "@/interfaces/survey";
import { FileImageOutlined, FilePdfOutlined } from "@ant-design/icons";
import Tooltip from "global/antd-kit/tooltip";
import toast from "react-hot-toast";

const TableDetail: React.FC<{ rowData: SurveyObjectResponseType }> = ({
  rowData,
}) => {
  const handleDownload = (url: string, fileName: string) => {
    toast.success("در حال دانلود فایل...");
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const icon = {
    pdf: <FilePdfOutlined style={{ fontSize: "20px", color: "red" }} />,
    image: <FileImageOutlined style={{ fontSize: "20px", color: "green" }} />,
  };

  const handleRenderIcon = (path: string) => {
    const index = path.split("").findLastIndex((item) => item === ".") + 1;
    const extention = path.slice(index) === "pdf" ? "pdf" : "image";

    return (
      <button onClick={() => handleDownload(path, path)}>
        <Tooltip title={`دانلود ${extention === "image" ? "عکس" : "PDF"}`}>
          {icon[extention]}
        </Tooltip>
      </button>
    );
  };

  if (rowData?.files?.length === 0) return <>-</>;
  return (
    <div className="flex items-center justify-center gap-x-4">
      {rowData.files.map((item) => {
        return handleRenderIcon(item.path);
      })}
    </div>
  );
};

export default TableDetail;
