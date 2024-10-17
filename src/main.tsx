import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/queryClient.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <App />
</Provider>
  </QueryClientProvider>
);
