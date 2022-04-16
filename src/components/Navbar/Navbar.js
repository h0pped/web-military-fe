import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link to="/">
            <h1 className="logo">Military</h1>
          </Link>
        </div>
        <div className="right">
          <ul>
            <li>
              <Link to="/browse">Browse Items</Link>
            </li>
            <li>
              <Link to="/">Order status</Link>
            </li>
            <li>
              <Link to="/">Sign in</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
