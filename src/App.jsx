
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
