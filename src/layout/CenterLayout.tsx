import { ReactNode } from "react";

const CenterLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      {children}
    </div>
  );
};

export default CenterLayout;
