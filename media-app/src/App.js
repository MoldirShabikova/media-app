import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./store/authContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./components/Auth";
import Header from "./components/Header"
import Home from "./components/Home";
import Profile from "./components/Profile";
import Post from "./components/Post"


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={authCtx.token ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/form"
          element={authCtx.token ? <Post /> : <Navigate to="/auth" />}
        />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
