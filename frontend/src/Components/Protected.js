import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const [login, setLogin] = useState(sessionStorage.getItem("login"));
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(sessionStorage.getItem("login"));
    login !== "true" ? navToLogin() : continueToComponent();
  });

  const navToLogin = () => {
    navigate("/auth");
  };

  const continueToComponent = () => {};

  return <div>{login === "true" ? <Component /> : continueToComponent()}</div>;
}

export default Protected;
