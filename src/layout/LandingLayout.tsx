import { type ComponentType, type ReactNode } from "react";
import Layout from "antd/lib/layout";

const LandingLayout: React.FC<{
  children: ReactNode;
  Header?: ComponentType;
  Footer?: ComponentType;
}> = ({ children, Header, Footer }) => {
  const layoutStyle = {
    // borderRadius: 8,
    // overflow: "hidden",
    // width: "100%",
    // maxWidth: "calc(100% - 8px)",
    // backgroundColor: "white",
  };

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <header className="p-2">{Header && <Header />}</header>
      <main className="p-2 min-h-vh">{children}</main>
      <footer className="p-2">{Footer && <Footer />}</footer>
    </Layout>
  );
};

export default LandingLayout;
