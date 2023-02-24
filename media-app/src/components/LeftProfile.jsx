import { useContext } from "react";

import home from '../assests/home.png'
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";


function LeftProfile() {
  const authCtx = useContext(AuthContext);
  // const { image, username, email } = useContext(AuthContext);
      const username = localStorage.getItem("username");
  const image = localStorage.getItem("image")
  const email = localStorage.getItem('email')
  return (
 
      <div className="left">
        <a className="profile">
           <NavLink to="/profile">
          <div className="profile-photo">
            <img src={image} alt="Profile photo" />
          </div>

          <div className="handle">
            <h4>Welcome, {username}</h4>
            <p className="text">{email}</p>
          </div>
          </NavLink>
        </a>

        <div className="sidebar">
          <a className="menu-item active">
            <span>
              <img src={home} alt="" />
            </span>
            <h3>Home</h3>
          </a>
          <a className="menu-item">
            <span>
              <i className="uil uil-compass"></i>
            </span>
            <h3>Explore</h3>
          </a>
          <a className="menu-item">
            <span>
              <i className="uil uil-bell"></i>
            </span>
            <h3>Notifications</h3>
            {/* <div className="notifications-popup">
            <div>
              <div className="profile-photo">
                <img src="./assests/images/profile-2.jpg" alt="Profile photo" />
              </div>
              <div className="notification-body">
                <b>Adam Barold</b>
              </div>
            </div>
          </div> */}
          </a>
          <a className="menu-item">
            <span>
              <i className="uil uil-envelope-alt"></i>
            </span>
            <h3>Messages</h3>
          </a>
          <a className="menu-item">
            <span>
              <i className="uil uil-setting"></i>
            </span>
            <h3>Settings</h3>
          </a>
        </div>
        <label htmlFor="create-post">
          <NavLink className="btn btn-primary" to="/post">
                  Add Post
                </NavLink>
        </label>
      </div>

  );
}

export default LeftProfile;
