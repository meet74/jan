import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./styles/index.scss";
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { AuthProvider } from "./pages/AuthProvider";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import Login from "./pages/Login.js";
import ProtectedRoute from "./pages/ProtectedRoute";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
      <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        {/*<Route path="/admin" component={Admin} />*/}
        <ProtectedRoute path="/admin" component={Admin} />
        {/*<Redirect from="/" to="/admin/dashboard" />*/}
      </Switch>
    </BrowserRouter>
  </AuthProvider>
    </AlertProvider>,
  document.getElementById("root")
);
