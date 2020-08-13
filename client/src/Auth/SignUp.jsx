import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import errorIcon from "../img/errors.svg";
import { Link, useHistory } from "react-router-dom";
import correctIcon from "../img/correct.svg";
import { useMutation } from "@apollo/client";
import { SignUpQueries } from "./SignUpQueries";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .trim("Cannot contain whitespaces")
    .required("Email Required"),
  username: Yup.string()
    .min(5, "Too short")
    .max(50, "Too long")
    .trim("Cannot contain whitespaces")
    .strict(true)
    .required("UserName Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/,
      "Must Contain 9 Characters, One Uppercase, One Lowercase, One Number "
    )
    .required("Password Required"),
  fullname: Yup.string()
    .trim("Cannot contain whitespaces")
    .min(5, "Too short")
    .max(50, "Too long")
    .required("Full Name Required"),
});

const SignUp = () => {
  const [textPassword, setTextPassword] = useState(false);
  const [alreadyEmail, setAlreadyEmail] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedSucess, setLoadedSucess] = useState(false);
  const [signUpForm, setSignUpForm] = useState();
  let history = useHistory();

  const [createUser] = useMutation(SignUpQueries);

  useEffect(() => {
    setSignUpForm(
      <div className="login-form sign-up">
        <Formik
          validationSchema={SignUpSchema}
          initialValues={{
            email: "",
            password: "",
            fullname: "",
            username: "",
          }}
          onSubmit={(values, actions) => {
            if (isLoaded) {
              values = {
                email: values.email,
                password: values.password,
                fullname: values.fullname.trim(),
                username: values.username.trim(),
              };

              createUser({
                variables: {
                  email: values.email,
                  username: values.username,
                  fullname: values.fullname,
                  password: values.password,
                },
              })
                .then((res) => {
                  setLoadedSucess(true);
                  setIsLoaded(false);
                  setTimeout(() => {
                    history.push("/login");
                  }, 3000);
                })
                .catch((err) => {
                  setAlreadyEmail(true);
                  actions.resetForm();
                  setIsLoaded(false);
                  setTimeout(() => {
                    setAlreadyEmail(false);
                  }, 3000);
                });
            }
          }}
        >
          {({ errors, values, touched }) => (
            <Form>
              <div
                className="input-field"
                style={
                  errors.email && touched.email && { borderColor: "#be4b49" }
                }
              >
                <Field
                  type="email"
                  placeholder="Email"
                  name="email"
                  style={{
                    borderLeft: "none",
                    padding: "4px",
                    width: "100%",
                  }}
                />

                {errors.email && touched.email && (
                  <div className="error">
                    <img src={errorIcon} alt="icon"></img>
                    <div className="error-message">{errors.email}</div>
                  </div>
                )}
                {alreadyEmail && !errors.email && !touched.email && (
                  <div className="error">
                    <img src={errorIcon} alt="icon"></img>
                    <div className="error-message" style={{ display: "block" }}>
                      The email address is already in use by another account.
                      Please use another email address or log in
                    </div>
                  </div>
                )}
              </div>
              <div
                className="input-field"
                style={
                  errors.fullname &&
                  touched.fullname && { borderColor: "#be4b49" }
                }
              >
                <Field
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  style={{
                    borderLeft: "none",
                    padding: "4px",
                    width: "100%",
                  }}
                />
                {errors.fullname && touched.fullname && (
                  <div className="error">
                    <img src={errorIcon} alt="icon"></img>
                    <div className="error-message">{errors.fullname}</div>
                  </div>
                )}
              </div>
              <div
                className="input-field"
                style={
                  errors.username &&
                  touched.username && { borderColor: "#be4b49" }
                }
              >
                <Field
                  type="text"
                  placeholder="UserName"
                  name="username"
                  style={{
                    borderLeft: "none",
                    padding: "4px",
                    width: "100%",
                  }}
                />
                {errors.username && touched.username && (
                  <div className="error">
                    <img src={errorIcon} alt="icon"></img>{" "}
                    <div className="error-message">{errors.username}</div>
                  </div>
                )}
              </div>
              <div
                className="input-field"
                style={
                  errors.password &&
                  touched.password && { borderColor: "#be4b49" }
                }
              >
                <Field
                  type={textPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  style={{
                    borderLeft: "none",
                    padding: "4px",
                    width: "100%",
                  }}
                />
                {errors.password && touched.password && (
                  <div className="error" style={{ marginLeft: "10px" }}>
                    <img src={errorIcon} alt="icon"></img>
                    <div className="error-message">{errors.password}</div>
                  </div>
                )}
                <div
                  className="hide-and-show"
                  onClick={() => setTextPassword(!textPassword)}
                >
                  {textPassword ? "Hide" : "Show"}
                </div>
              </div>

              <div className="button-group-field-signup">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    values.password === "" ||
                    values.fullname === "" ||
                    values.username === "" ||
                    values.email === ""
                  }
                  onClick={() =>
                    !errors.email &&
                    !errors.password &&
                    !errors.username &&
                    !errors.fullname &&
                    setIsLoaded(true)
                  }
                >
                  {isLoaded ? (
                    <div style={{ padding: "0px 14px" }}>
                      <div
                        className="spinner-grow spinner-grow-sm text-light"
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
                <div>
                  Have An Account?
                  <span>
                    <Link to="/">Log in</Link>
                  </span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="Terms-and-Policy">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy
        </div>
      </div>
    );
    return () => {
      setSignUpForm();
    };
  }, [isLoaded, alreadyEmail, textPassword, history, createUser]);

  return (
    <div className="right-container">
      <h1>LIber</h1>
      {loadedSucess ? (
        <div
          className="login-form sign-up"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "40%",
          }}
        >
          <img src={correctIcon} alt="icon" height="40px" width="40px"></img>
          <div
            style={{ fontSize: "20px", marginLeft: "5px", color: "#1CC433" }}
          >
            Sign up success
          </div>
        </div>
      ) : (
        signUpForm
      )}
    </div>
  );
};

export default SignUp;
