import React from "react";
import "./leftProfile.css"
function LeftProfile() {
  return (
    <div className="left">
      <a className="profile">
        <div className="profile-photo">
          <img src="./assests/images/profile-1.jpg" alt="Profile photo" />
        </div>

        <div className="handle">
          <h4>Diana Sky</h4>
          <p className="text">@diana</p>
        </div>
      </a>

      <div className="sidebar">
        <a className="menu-item active">
          <span>
            <i className="uil uil-home"></i>
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
          <div className="notifications-popup">
            <div>
              <div className="profile-photo">
                <img src="./assests/images/profile-2.jpg" alt="Profile photo" />
              </div>
              <div className="notification-body">
                <b>Adam Barold</b>
              </div>
            </div>
          </div>
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
      <label htmlFor="create-post" className="btn btn-primary">
        Create Post
      </label>
    </div>
  );
}

export default LeftProfile;
