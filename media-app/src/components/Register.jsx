import React, { useState, useContext } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authContext";


function Register() {
      const [message, setMessage] = useState("");
      const [display, setDisplay] = useState("none");
      const [user, setUser] = useState({
          username: "",
          email: "",
         password: "",
       
      });
    
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    
const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  console.log(name, value);
  setUser({ ...user, [name]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (user.username && user.email && user.password) {
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    axios
      .post("http://localhost:8080/register", newUser)
      .then(({ data }) => {
        console.log("After Auth", data);
        navigateTo();
        const { token, exp, userId, username } = data;
        authCtx.login(token, exp, userId, username);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data);
      });
  }
  setUser({
      username: "",
      email: "",
    password: "",
   
  });
};

const navigateTo = () => {
  navigate("/");
};

  return (
    <div className="login">
      <div className="card">
        <div>
          <h1>Register</h1>

          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="username"
                id="name"
                placeholder="name"
                value={user.username}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={user.password}
                onChange={handleChange}
              />
            </label>
            <div><h1>{ message}</h1></div>
            <button>Register</button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="google-btn">
              <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M366 187c0-16.5-1.5-33-4.5-49.5H187v93h104c-4.5 24.8-16.8 46.4-34.5 63.4v52h55.5c32.4-29.7 51-73.2 51-124.9z"
                  fill="#4285F4"
                />
                <path
                  d="M187 372c46.5 0 85.2-15.3 114.3-41.5l-55.5-52c-15 10.2-34.2 16-58.8 16-45 0-83.1-30.6-96.6-71.8H32v56.2C55.2 345.8 117.2 372 187 372z"
                  fill="#34A853"
                />
                <path
                  d="M90.4 223.5c-5.4-16.5-5.4-34.1 0-50.6V116H32c-21.7 38.9-21.7 84.5 0 123.4l58.4-16.9z"
                  fill="#FBBC05"
                />
                <path
                  d="M187 105c24.4 0 46.4 8.4 63.7 24.9l47.8-47.8C271.6 48.6 234.5 32 187 32 117.2 32 55.2 58.2 32 99.8L90.4 116c13.5-41.2 51.6-71.8 96.6-71.8z"
                  fill="#EA4335"
                />
              </svg>
              <span>Log in with Google</span>
            </div>

            <div className="links">
              {/* <p>Forgot password?</p> */}
              <p onClick={navigateTo}>Have an account? Sign in</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
