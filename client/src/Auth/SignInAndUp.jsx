import React from "react";
import signInandUpImg from "../img/authentication.png";
import SignIn from "./SignIn";
import "./SignInAndUp.css";
import SignUp from "./SignUp";
import { Route } from "react-router-dom";

const SignInAndUp = () => {
  return (
    <div className="signin-signup-container">
      <div className="left-container">
        <img src={signInandUpImg} alt="ads"></img>
      </div>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
};

export default SignInAndUp;
