import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from "../layouts/Default";
import Signin from "../views/Signin";
import Home from "../views/Home";
import Signup from "../views/Signup";
import ForgotPassword from "../views/ForgotPassword";
import Profile from "../views/Profile";
import MyLinks from "../views/MyLinks";
import MyLink from "../views/MyLink";
import AuthVerify from "../views/AuthVerify";
import NotFound from "../views/NotFound";

const Routes = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/auth-verify" component={AuthVerify} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/links" component={MyLinks} />
          <Route path="/links/:shortCode" component={MyLink} />
          <Route component={NotFound} />
        </Switch>
      </DefaultLayout>
    </Router>
  );
};

export default Routes;
