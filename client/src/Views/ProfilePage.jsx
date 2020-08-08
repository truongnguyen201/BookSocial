import React, { Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import Posts from "../components/News/Posts";
import MainInfo from "./ProfileInfo/MainInfo";
import DetailInfo from "./ProfileInfo/DetailInfo";
import ProfilePageNavBar from "./ProfileInfo/ProfilePageNavBar";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import ProfilePost from "./ProfileDetail/ProfilePost";
import ProfileFollowers from "./ProfileDetail/ProfileFollowers";
import ProfileFollowing from "./ProfileDetail/ProfileFollowing";
import ProfileShares from "./ProfileDetail/ProfileShares";

const ProfilePage = () => {
  const match = useRouteMatch();
  const { profiledetail } = useParams();
  const profiledetails = [
    { linkparams: "main", component: Posts },
    { linkparams: "posts", component: ProfilePost },
    { linkparams: "shares", component: ProfileShares },
    {
      linkparams: "followers",
      component: ProfileFollowers,
    },
    {
      linkparams: "following",
      component: ProfileFollowing,
    },
  ];
  return (
    <div className="ProfilePage">
      <NavBar></NavBar>
      <div className="ProfileMainPage">
        <div>
          <MainInfo></MainInfo>
          <ProfilePageNavBar></ProfilePageNavBar>
          {profiledetails.map(
            (detail, index) =>
              profiledetail === detail.linkparams && (
                <Route
                  exact
                  path={`${match.url}`}
                  key={index}
                  component={detail.component}
                />
              )
          )}
        </div>
        <DetailInfo></DetailInfo>
      </div>
    </div>
  );
};

export default ProfilePage;
