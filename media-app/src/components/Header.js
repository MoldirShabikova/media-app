import React from "react";
import "./Header.css"

function Header() {
  return (
    <nav className="header">
      <div className="logo">
       Logo
      </div>
      <div className="button-container">
        <button className="button">Create</button>
        <button className="button">Sign in</button>
      
      <div className="profile">
        <img
          src=""
          alt=""
        />
        </div>
      </div>
    </nav>
  );
}

export default Header;
