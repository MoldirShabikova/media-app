import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"

import AuthContext from "../store/authContext";
// import person  from "../assests/person.jpg"

const Header = () => {
  const authCtx = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("image")

 

  return (
    <nav>
      <div className="container">
        <h2 className="logo">Social App</h2>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for creators, inspirations"
          />
        </div>
        <div className="create">
          {authCtx.token ? (
            <ul className="nav-link">
              <li>
                <NavLink className="btn btn-primary" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <div className="profile-photo">
                    <img src={image} alt="person" />
                  </div>
                    <h1>Welcome, {username}</h1>
                </NavLink>
              </li>
              <li>
                <NavLink className="btn btn-primary" to="/post">
                  Add Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn btn-primary"
                  onClick={() => authCtx.logout()}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              {/* <li>
              <NavLink to="/">Home</NavLink>
            </li> */}
              <li>
                <NavLink className="btn btn-primary" to="/auth">
                  Login or Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
