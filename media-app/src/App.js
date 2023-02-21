import {Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="App">
{/* <Header /> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/" element={}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
