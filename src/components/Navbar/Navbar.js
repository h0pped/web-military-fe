import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("email");

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
              <Link to="/">Cart</Link>
            </li>
            <li>
              {!isLoggedIn ? (
                <Link to="/signin">Sign in</Link>
              ) : (
                <Link to="/">Log Out</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
