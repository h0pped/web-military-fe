import React, { useState } from "react";
import "./SignUp.css";
const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.password.length > 0 &&
      userData.password === userData.password2
    ) {
      if (
        userData.name &&
        userData.surname &&
        userData.gender &&
        userData.email
      ) {
        const res = await fetch(`http://localhost:8000/users/`, {
          method: "POST",
          body: JSON.stringify({
            ...userData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        console.log(res);
      }
    }
  };
  return (
    <div className="main">
      <form>
        <h1>Registration</h1>
        <span>
          <i className="fa fa-user-o" style={{ color: "black" }}></i>
          <input
            type="text"
            placeholder="Name"
            name=""
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
        </span>
        <br></br>
        <span>
          <i className="fa fa-id-card-o" style={{ color: "black" }}></i>
          <input
            type="text"
            placeholder="Surname"
            name="/"
            value={userData.surname}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, surname: e.target.value };
              })
            }
          />
        </span>
        <br></br>
        <span>
          <i className="fa fa-male" style={{ color: "black" }}></i>
          <select
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, gender: e.target.value };
              })
            }
          >
            <option value="m">Male</option>
            <option value="w">Female</option>
          </select>
        </span>
        <br></br>
        <span>
          <i className="fa fa-at" style={{ color: "black" }}></i>
          <input
            type="email"
            placeholder="Email"
            name=""
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
        </span>
        <br></br>
        <span>
          <i className="fa fa-key" style={{ color: "black" }}></i>
          <input
            type="password"
            placeholder="Password"
            name=""
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
        </span>
        <br></br>
        <span>
          <i className="fa fa-key" style={{ color: "black" }}></i>
          <input
            type="password"
            placeholder="Confirm password"
            name=""
            value={userData.password2}
            onChange={(e) =>
              setUserData((prev) => {
                return { ...prev, password2: e.target.value };
              })
            }
          />
        </span>
        <br></br>

        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit.bind(this)}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default SignUp;
