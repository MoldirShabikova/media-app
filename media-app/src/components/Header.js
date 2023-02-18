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
          src="https://preview.redd.it/dtqfxnygwx471.png?auto=webp&s=0d547ff02e736bf56a8d050bd0aff38281b8e3d2"
          alt=""
        />
        </div>
      </div>
    </nav>
  );
}

export default Header;
