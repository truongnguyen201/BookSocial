import React from "react";
import boxmail from "../../img/boxmail.png";
import { useQuery } from "@apollo/client";
import { getUserFollowing } from "../../components/Queries/getUserProfile";
import Loading from "../../components/Loading";
import OtherUser from "../../components/OtherUser";
import { useLocation } from "react-router-dom";

const ProfileFollowing = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(getUserFollowing, {
    variables: { _id: location.state.id },
  });

  if (loading)
    return (
      <div className="Posts">
        <Loading></Loading>
      </div>
    );
  if (error) return <div className="Posts">Error :(</div>;

  return (
    <div className="ProfileFollowing">
      <div className="HeaderTitle">Following</div>
      {data.user.NumbOfFollowing === 0 ? (
        <div className="ProfileDetailContent">
          <img
            src={boxmail}
            height="150px"
            width="150px"
            alt="boxmailicon"
          ></img>
          <span>You aren't following anyone yet.</span>
        </div>
      ) : (
        <div className="ShowOtherUser">
          {data.user.FollowingList.map((following, index) => (
            <OtherUser
              key={index}
              Otherusername={following.username}
              Otherfullname={following.fullname}
              OtherId={following._id}
            ></OtherUser>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFollowing;
