import { QueryClient } from "@tanstack/react-query";
// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 2 * 1000,
    },
  },
});
