import { createRoot } from "react-dom/client";
import App from "./App";
import { Router, Route } from "wouter";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
// Cache bust: 1766696100
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Route path="/" component={App} />
      <Route path="/privacy" component={PrivacyPolicy} />
    </Router>
  </QueryClientProvider>
);
