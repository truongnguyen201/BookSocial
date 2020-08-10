import React from "react";
import NavBar from "../NavBar/NavBar";
import MainInfo from "./ProfileInfo/MainInfo";
import DetailInfo from "./ProfileInfo/DetailInfo";
import ProfilePageNavBar from "./ProfileInfo/ProfilePageNavBar";
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom";
import ProfilePost from "./ProfileDetail/ProfilePost";
import ProfileFollowers from "./ProfileDetail/ProfileFollowers";
import ProfileFollowing from "./ProfileDetail/ProfileFollowing";
import ProfileShares from "./ProfileDetail/ProfileShares";
import ProfileMain from "./ProfileDetail/ProfileMain";
import { useQuery } from "@apollo/client";
import { getUserProfile } from "../components/Queries/getUserProfie";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const match = useRouteMatch();
  const { profiledetail } = useParams();
  const { loading, error, data } = useQuery(getUserProfile, {
    variables: { _id: localStorage.getItem("id") },
  });

  return (
    <div className="ProfilePage">
      <NavBar></NavBar>
      {loading && (
        <div className="Posts">
          <Loading></Loading>
        </div>
      )}
      {error && <div>error:)</div>}
      {!loading && !error && (
        <div className="ProfileMainPage">
          <div>
            <MainInfo></MainInfo>
            <ProfilePageNavBar
              NumbOfFollowing={data.user.NumbOfFollowing}
              NumbOfFollowers={data.user.NumbOfFollowers}
              NumbOfPost={data.user.NumbOfPost}
            ></ProfilePageNavBar>
            <Route exact path={`${match.url}`}>
              {profiledetail === "main" && <ProfileMain></ProfileMain>}
              {profiledetail === "posts" && <ProfilePost></ProfilePost>}
              {profiledetail === "following" && (
                <ProfileFollowing></ProfileFollowing>
              )}
              {profiledetail === "followers" && (
                <ProfileFollowers></ProfileFollowers>
              )}
              {profiledetail === "shares" && <ProfileShares></ProfileShares>}
            </Route>
          </div>
          <DetailInfo></DetailInfo>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
