import "./login.css";
import { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="login">
      <div className="card">
        <div>
          <h1>Log in</h1>

          <form className="form">
            <label htmlFor="email">
              Email
              <input type="email" name="email" id="email" placeholder="email" />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </label>
            <button>Log in</button>

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
              <a href="#">Forgot password?</a>
              <a href="#">Don't have an account? Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
