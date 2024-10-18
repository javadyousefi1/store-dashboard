import { ReactNode } from "react";

const AuthLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      style={{
        height: "100dvh",
        width:"100%"
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
