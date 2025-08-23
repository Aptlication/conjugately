import { createRoot } from "react-dom/client";
import FreshApp from "./fresh-app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <FreshApp />
  </QueryClientProvider>
);