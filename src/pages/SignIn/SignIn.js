import React, { useState } from "react";
import "./SignIn.css";
import "../../index.css";
import { Navigate } from "react-router-dom";
const SignIn = ({ handleLogIn }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const submitHandler = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/?user_email=${email}&user_password=${password}`
    );
    if (res.status === 200) {
      localStorage.setItem("email", email);
      const data = await res.json();
      localStorage.setItem("id", data.id);
      setIsLoggedIn(true);
      handleLogIn();
    }
  };
  return (
    <>
      {isLoggedIn ? <Navigate to="/" /> : null}
      <div className="signin-container">
        <h2>Sign in!</h2>
        <form action="#" id="signform">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-container submit">
            <button
              type="button"
              value="Sign in"
              className="sign-in-btn"
              onClick={submitHandler}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
