import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./component/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Signup/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
