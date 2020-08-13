import React from "react";
import { PrivateRoute } from "../Auth/authentication";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";

const MainPage = () => {
  const userProfile = useSelector((state) => state.UserProfile);
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  if (isEmpty(userProfile))
    return (
      <div className="MainPage">
        <PrivateRoute exact path="/">
          <Loading></Loading>
        </PrivateRoute>
      </div>
    );
  return (
    <div>
      <PrivateRoute exact path="/">
        <HomePage></HomePage>
      </PrivateRoute>
      <PrivateRoute path="/profile/:username/:profiledetail">
        <ProfilePage></ProfilePage>
      </PrivateRoute>
    </div>
  );
};

export default MainPage;
