import "./App.css";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Dashboard from "./page/Dashboard";
import UpdateTodo from "./page/UpdateTodo";

function App() {
  const isAuthenticated = !localStorage.getItem("token");
 
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element = {isAuthenticated ?  <Signup/> : <Navigate to="/"/>} />
        <Route path="/login" element = {isAuthenticated ? <Login/> : <Navigate to = "/"/>} />
        <Route path="/dashboard" element ={isAuthenticated ? <Dashboard/> : <Navigate  to="/"/>} /> 
        <Route path="/update/:id" element={isAuthenticated ? <UpdateTodo/> : <Navigate to = "/dashboard" />} />

        {/* <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* <Route path="/dashboard" element =is {<Dashboard/>} /> */}
        {/* <Route path="/update/:id" element={<UpdateTodo />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
