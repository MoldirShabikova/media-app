import { useContext } from "react";
import { NavLink } from "react-router-dom";


import AuthContext from "../store/authContext";


const Header = () => {
  const authCtx = useContext(AuthContext);
  const image = localStorage.getItem("image")


  return (
    <nav>
      <div className="container">
        <NavLink to="/" className="logo">
          Social App
        </NavLink>
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
              <div className="nav-text">
                <li>
                  <NavLink to="/profile">
                    <div className="profile-photo">
                      <img src={image} alt="person" />
                    </div>
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
              </div>
            </ul>
          ) : (
            <ul>
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
