import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import CreateTodo from "./page/CreateTodo";
import UpdateTodo from "./page/UpdateTodo";
import ReadTodo from "./page/ReadTodo";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Signup/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/todo" element= {<CreateTodo/>} />
        <Route path="/todo/:id" element = {<UpdateTodo/>} />
        <Route path="/todos" element = {<ReadTodo/>} />
      
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
