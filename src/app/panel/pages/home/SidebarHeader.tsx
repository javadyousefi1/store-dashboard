const dargahUrl = import.meta.env.VITE_APP_DARGAH_URL;
const loginUrl = import.meta.env.VITE_APP_LOGIN_URL;

// antd
import { Divider } from "antd";
// global features
import Tooltip from "antd/lib/tooltip";
import Popconfirm from "antd/lib/popconfirm";
// react
import { useState } from "react";
// redux
import { useSelector } from "react-redux";
// api
// import { logOutCurrentUser } from "@/api/auth";
// react hot toast
import toast from "react-hot-toast";
// component
import IconifyComp from "@/components/shared/IconifyComp";

const SidebarHeader: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { userData } = useSelector((state) => state?.usersSlice);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      // Request full screen
      document.documentElement.requestFullscreen();
    } else {
      // Exit full screen
      document.exitFullscreen();
    }

    // Update the state
    setIsFullScreen(!isFullScreen);
  };

  const handleLogout = () => {
    const loading = toast.loading("در حال خروج از حساب...");
    // logOutCurrentUser()
      .then(() => {
        toast.success("با موفقیت از حساب خود خارج شدید");
        setTimeout(() => {
          window.location.href = loginUrl;
        }, 1000);
      })
      .catch(() => {
        toast.error("خروج از حساب با خطا مواجه شد");
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };
  const handleRedirectToHome = () => {
    window.location.href = dargahUrl;
  };

  return (
    <header className="mt-6 ">
      <div className="flex flex-col items-center">
        {/* profile */}

        {userData?.avatarFilePath ? (
          <img
            src={userData?.avatarFilePath}
            width="48px"
            height="48px"
            className="object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 border rounded-full bg-primary border-primary">
            <IconifyComp icon="user" size="2xl" color="#fff" />
          </div>
        )}

        <div className={`flex flex-col ${collapsed ? "" : "hidden"}`}>
          {/* user name */}
          <p className="mt-3 text-center text-md">{userData?.fullName}</p>
          {/* user role */}
          {/* <span className="text-xs text-gray-500">سوپر ادمین سامانه</span> */}
        </div>

        <div
          className={`flex justify-between gap-x-4 mt-5 ${
            collapsed ? "" : "hidden"
          }`}
        >
          {/* home page */}
          <Tooltip title="بازگشت به درگاه">
            <button type="button" onClick={handleRedirectToHome}>
              <IconifyComp icon="home" size="xl" />
            </button>
          </Tooltip>
          {/* magnification */}
          <Tooltip title={isFullScreen ? "کوچک نمایی" : "بزرگ نمایی"}>
            <button type="button" onClick={handleFullScreen}>
              {isFullScreen ? (
                <IconifyComp icon="quitMagnification" size="xl" />
              ) : (
                <IconifyComp icon="magnification" size="xl" />
              )}
            </button>
          </Tooltip>
          {/* log out */}
          <Tooltip title="خروج از حساب">
            <Popconfirm
              onConfirm={handleLogout}
              description="آیا از خروج خود اطمینان دارید ؟"
              title="خروج"
              okText="بله"
              cancelText="انصراف"
              className="cursor-pointer"
            >
            <span>

              <IconifyComp icon="logOut" size="xl" color="#D20707" />
            </span>
            </Popconfirm>
          </Tooltip>
        </div>
        <Divider />
      </div>
    </header>
  );
};

export default SidebarHeader;
