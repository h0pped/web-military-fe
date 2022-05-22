import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, isAdmin }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [admin, setAdmin] = useState(isAdmin);
  useEffect(() => {
    setLoggedIn(isLoggedIn);
    setAdmin(isAdmin);
  }, [isLoggedIn, isAdmin]);
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
            {!loggedIn && (
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            )}
            <li>{loggedIn && admin && <Link to="/admin">Admin panel</Link>}</li>
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
