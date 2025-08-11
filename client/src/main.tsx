import { createRoot } from "react-dom/client";
import App from "./App";
import { Router, Route } from "wouter";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
// Cache bust: 1753571500
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Route path="/" component={App} />
    <Route path="/privacy" component={PrivacyPolicy} />
  </Router>
);
