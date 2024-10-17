import {
  ComponentType,
  FC,
  memo,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import Menu from "antd/lib/menu";
import Layout from "antd/lib/layout";
const { Header, Content, Footer, Sider } = Layout;
import { Breadcrumb, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "antd/lib/drawer";
import Tooltip from "antd/lib/tooltip";
import { Outlet } from "react-router-dom";

const findObjectByKey = (menuList, key, foundKey = "key") => {
  let result = null;

  const search = (items) => {
    for (const item of items) {
      if (item[foundKey] === key) {
        result = item;
        break;
      }
      if (item.children && item.children.length > 0) {
        search(item.children);
      }
    }
  };

  search(menuList);
  return result;
};

const PanelLayout: FC<{
  Footer?: ComponentType;
  menuList: any;
  sidebarHeader?: JSX.Element;
  BreadcrumbList?: string[];
  children: ReactNode;
  HeaderContent?: ComponentType;
  handleSetCollapsed: (status: boolean) => void;
  isMainFullScreen: boolean;
}> = ({
  Footer: FooterProps,
  sidebarHeader,
  menuList,
  BreadcrumbList,
  children,
  HeaderContent,
  handleSetCollapsed = () => {},
  isMainFullScreen,
}) => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const [currentKeyRoute, setCurrentKeyRoute] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeUserRoute = (route: string, queryString?: string) =>
    navigate(route, queryString);

  useEffect(() => {
    const foundItem = findObjectByKey(menuList, location.pathname, "href");
    setCurrentKeyRoute(foundItem?.key);
  }, []);

  useEffect(() => {
    handleSetCollapsed(!collapsed);
  }, [collapsed]);

  const handleMenuClick = ({ key }) => {
    const foundMenu = findObjectByKey(menuList, key);
    if (foundMenu?.queryString) {
      handleChangeUserRoute(
        `${foundMenu?.href}${foundMenu?.queryString}` ?? "/"
      );
      return;
    }
    handleChangeUserRoute(foundMenu?.href ?? "/");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showMobileMenu = useCallback(() => setMobileMenu(true), []);
  const onCloseMobileMenu = useCallback(() => setMobileMenu(false), []);

  return (
    <>
      {/* desktop */}
      <Layout style={{ minHeight: "100vh" }} className="hidden md:flex">
        <Sider
          trigger={null}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Tooltip title={collapsed ? "باز کردن منو" : "بستن منو"}>
            <button
              className={`fixed top-10  z-50 ${
                !collapsed ? "right-[170px]" : "right-[62px]"
              }`}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <svg
                className={`${collapsed ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="#111"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
                ></path>
              </svg>
            </button>
          </Tooltip>

          <div style={{ position: "sticky", top: "20px" }}>
            {sidebarHeader}
            <Menu
              key={currentKeyRoute}
              defaultSelectedKeys={[currentKeyRoute]}
              defaultOpenKeys={["sub1"]}
              mode={"inline"}
              theme={"light"}
              items={menuList}
              onClick={handleMenuClick}
            />
          </div>
        </Sider>
        <Layout>
          {HeaderContent && (
            <Header style={{ padding: "2px", background: colorBgContainer }}>
              {<HeaderContent />}
            </Header>
          )}
          {isMainFullScreen ? (
            <Outlet/>
          ) : (
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                {BreadcrumbList &&
                  BreadcrumbList.map((item: string) => (
                    <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                  ))}
              </Breadcrumb>
              <div
                style={{
                  padding: "14px 24px",
                  minHeight: 360,
                  background: "white",
                  borderRadius: borderRadiusLG,
                }}
              >
             <Outlet/>
              </div>
            </Content>
          )}

          <Footer>{FooterProps && <FooterProps />}</Footer>
        </Layout>
      </Layout>
      {/* header */}
      <header className="p-2 shadow md:hidden">
        <button onClick={showMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </header>

      {/* mobile */}
      <div className="!md:hidden">
        <Drawer
          title=""
          onClose={onCloseMobileMenu}
          open={MobileMenu}
          width={320}
        >
          {sidebarHeader}
          <Menu
            className="!border-none"
            key={currentKeyRoute}
            defaultSelectedKeys={[currentKeyRoute]}
            defaultOpenKeys={["sub1"]}
            mode={"inline"}
            theme={"light"}
            items={menuList}
            onClick={(e) => {
              handleMenuClick(e);
              onCloseMobileMenu();
            }}
          />
        </Drawer>
        <div className="md:hidden">{children}</div>
      </div>
    </>
  );
};

export default memo(PanelLayout);
