import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/queryClient.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#605bff", // Primary color
    colorPrimaryBg: "#EFEFFF", // Background color for primary elements
    colorTextBase: "#030229", // Primary text color
    colorTextPlaceholder: "#BDBDBD", // Placeholder text color
    colorTextWhite: "#FFFFFF", // White text color
    colorTextSecondary: "#444444", // Secondary text color
    colorTextTertiary: "#767676", // Tertiary text color
    colorBgBase: "#FFFFFF", // Base background color
    colorBgContainer: "#fff", // Container background color
    colorBgLayout: "#FAFAFA", // Layout background color
    colorBorder: "#E4E4E4", // Border color
  },
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </QueryClientProvider>
);
