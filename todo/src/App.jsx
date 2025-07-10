import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./page/Dashboard";
import UpdateTodo from "./page/UpdateTodo";
import Admindashboard from "./admin/admindashboard";
import TodoupdateAdmin from "./admin/TodoupdateAdmin";

const isAuthenticated = () => localStorage.getItem("token");
const getUserRole = () => localStorage.getItem("role");

const PublicRoute = ({ children }) => {
  if (!isAuthenticated()) return children;

  const role = getUserRole();
  if (role === "admin") return <Navigate to="/admindashboard" />;
  if (role === "user") return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const role = getUserRole();
  if (role === "admin") return children;
  if (role === "user") return <Navigate to="/dashboard" />;

  return <Navigate to="/login" />;
};

const UserRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const role = getUserRole();
  if (role === "user") return children;
  if (role === "admin") return <Navigate to="/admindashboard" />;

  return <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <UserRoute>
              <UpdateTodo />
            </UserRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <AdminRoute>
              <Admindashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/adminupdate/:id"
          element={
            <AdminRoute>
              <TodoupdateAdmin />
            </AdminRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
