import React, { useState } from "react";
import usernameIcon from "../img/usernameIcon.png";
import passwordIcon from "../img/passwordIcon.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useMutation } from "@apollo/client";
import { SignInQueries } from "./SignInQueries";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(9).required(),
});
const SignIn = () => {
  const [textPassword, setTextPassword] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const [SignIn] = useMutation(SignInQueries);

  return (
    <div className="right-container">
      <h1>Amstagram</h1>
      <Formik
        className="login-form"
        validationSchema={SignInSchema}
        initialValues={{
          email: "truong12345@gmail.com",
          password: "Truong1234",
        }}
        onSubmit={(values) => {
          SignIn({
            variables: {
              email: values.email,
              password: values.password,
            },
          })
            .then((res) => {
              var token = res.data.login.token;
              var username = res.data.login.username;
              var _id = res.data.login._id;
              var fullname = res.data.login.fullname;

              localStorage.setItem("fullname", fullname);
              localStorage.setItem("username", username);
              localStorage.setItem("token", token);
              localStorage.setItem("id", _id);
              dispatch(login());
              history.push("/");
              setIsLoaded(false);
            })
            .catch((err) => {
              setIsLoaded(false);
              setErrorCode(true);
              setTimeout(() => {
                setErrorCode(false);
              }, 4000);
            });
        }}
      >
        {({ errors, values, touched }) => (
          <Form>
            <div className="input-field">
              <img src={usernameIcon} alt="icon"></img>
              <Field type="email" placeholder="Email" name="email" />
            </div>
            <div className="input-field">
              <img src={passwordIcon} alt="icon"></img>
              <Field
                type={textPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
              <div
                className="hide-and-show"
                onClick={() => setTextPassword(!textPassword)}
              >
                {textPassword ? "Hide" : "Show"}
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                textAlign: "left",
                marginTop: "2px",
                color: "red",
                userSelect: "none",
                width: "250px",
                height: "20px",
              }}
            >
              {errorCode && (
                <div>
                  Wrong email or your password is incorrect. Please try again
                </div>
              )}
            </div>

            <div className="button-group-field">
              <Field type="checkbox" name="checkbox" />
              <div>Remember Me</div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  errors.email ||
                  errors.password ||
                  values.password === "" ||
                  values.email === ""
                }
                onClick={() => {
                  setIsLoaded(true);
                }}
              >
                {isLoaded ? (
                  <div style={{ padding: "0px 13px" }}>
                    <div
                      className="spinner-grow spinner-grow-sm text-light"
                      role="status"
                    ></div>
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
            <div className="signup-retake">
              <Link
                style={{ color: "#007bff" }}
                className="Register"
                to="/signup"
              >
                Register Now?
              </Link>
              <div className="Retake">Forgot Password?</div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="horizontal-line">
        <div style={{ padding: "0 10px" }}>or</div>
      </div>
      <div className="OAuth">
        <div className="OAuth-facebook">
          <div className="fa fa-facebook fa-fw"></div> Login with Facebook
        </div>
        <div className="OAuth-gmail">
          <i className="fa fa-google fa-fw"></i> Login with Gmail
        </div>
      </div>
    </div>
  );
};

export default SignIn;
