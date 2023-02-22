import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"

import AuthContext from "../store/authContext";
import person  from "../assests/person.jpg"

const Header = () => {
  const authCtx = useContext(AuthContext);

 

  return (
    <nav className="container">
      <h2 className="logo">Social App</h2>

      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input type="search" placeholder="Search for creators, inspirations" />
      </div>
      <div className="create">
        <div className="profile-photo">
          <img src={person} alt="person" />
        </div>
        {authCtx.token ? (
          <ul className="nav-link">
            <li>
              <NavLink  to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink  to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink  to="/form">
                Add Post
              </NavLink>
            </li>
            <li>
              <NavLink className="logout-btn" onClick={() => authCtx.logout()}>
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink  to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink  to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink  to="/auth">
                Login or Sign Up
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
