import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
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
              <Link to="/status">Order status</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              {!loggedIn ? (
                <Link to="/signin">Sign in</Link>
              ) : (
                <Link to="/logout">Log Out</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
