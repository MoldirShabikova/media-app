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

import "./App.css"
function App() {
  const authCtx = useContext(AuthContext);

 
  return (
    
    <main>
      
      <Header />
      <div className="container">
       
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route
            
            path="/auth"
            element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
          />

          <Route path="/login" element={<Login className='middle'/>} />
          <Route
            path="/profile"
            element={authCtx.token ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/post"
            element={authCtx.token ? <Post /> : <Navigate to="/auth" />}
          />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
        </div>
      </main>
 
  );
}

export default App;
