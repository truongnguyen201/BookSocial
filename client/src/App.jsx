import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SignInAndUp from "./Auth/SignInAndUp";
import { GetMainUserProfile } from "./redux/actions";
import { useDispatch } from "react-redux";
import MainPage from "./Views/MainPage";

function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("token") !== null) {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        dispatch(
          GetMainUserProfile(
            localStorage.getItem("token"),
            localStorage.getItem("id")
          )
        );
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <MainPage></MainPage>
        <Route exact path="/login" component={SignInAndUp} />
        <Route exact path="/signup" component={SignInAndUp} />
      </div>
    </BrowserRouter>
  );
}

export default App;
