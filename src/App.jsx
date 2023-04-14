import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Student/Dashboard";

function App() {
  const routes = [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} Component={route.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
