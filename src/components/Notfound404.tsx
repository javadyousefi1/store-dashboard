import { Link } from "react-router-dom";
import Empty from "global/antd-kit/empty";
import Typography from "global/antd-kit/typography";

const NotFound404: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-[100px]">
        <Empty
          imageStyle={{ height: 80 }}
          description={<Typography.Text>صفحه مورد نظر شما یافت نشد</Typography.Text>}
        ></Empty>
    </div>
  );
};
export default NotFound404;