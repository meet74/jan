import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useHistory } from "react-router-dom";

function LoginComponent() {
  const { register, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const emailInput = (event) => {
    setEmail(event.target.value);
  };

  const passwordInput = (event) => {
    setPassword(event.target.value);
  };
  const [buttonStatus, setButtonStatus] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonStatus(true);
    await login(email, password);
    history.push("/admin/dashboard");
    setButtonStatus(false);
  };
  return (
    <div className="Login">
      <div className="login__container">
        <h2 className="login__header">Login</h2>
        <div>
          <form className="login__input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              onChange={emailInput}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={passwordInput}
              required
            />
            <button type="submit" disabled={buttonStatus}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
