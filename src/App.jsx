import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Student/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import StudentResult from "./pages/Student/Result";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      path: "/student",
      component: Dashboard,
    },
    {
      path: "/admin",
      component: AdminDashboard,
    },
    {
      path: "/student/result",
      component: StudentResult,
    },
  ];

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path} Component={route.component} />
          ))}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
