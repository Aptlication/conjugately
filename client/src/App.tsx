import { Switch, Route } from "wouter";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="*" component={() => <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><h1 className="text-2xl">Page Not Found</h1></div>} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
