import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { AuthContext } from "./AuthProvider";
import firebase from "firebase/app";
function Login() {
  const { logout, user, setUser } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      }
      setUser(null);
    });
  }, []);
  /*useEffect(() => {
    if (user != null) history.push("/");
  }, [user]);*/
  return (
    <div className="loginPage">
      <LoginComponent />
    </div>
  );
}

export default Login;
