import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ handleLogout }) => {
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <Navigate to="/" />;
};

export default Logout;
