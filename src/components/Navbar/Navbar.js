import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <h1>Military</h1>
        </div>
        <div className="right">
          <ul>
            <li>
              <a href="#">Browse Items</a>
            </li>
            <li>
              <a href="#">Order status</a>
            </li>
            <li>
              <a href="#">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
