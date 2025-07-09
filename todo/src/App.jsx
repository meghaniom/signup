import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./page/Dashboard";
import UpdateTodo from "./page/UpdateTodo";

const isAuthenticated = () => localStorage.getItem("token");

const PrivateRoute = ({ children }) => {
  console.log(isAuthenticated(),"isAuthenticated()");
  
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
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
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateTodo />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
