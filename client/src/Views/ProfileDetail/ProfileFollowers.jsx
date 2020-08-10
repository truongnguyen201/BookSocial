import React from "react";
import boxmail from "../../img/boxmail.png";
import { useQuery } from "@apollo/client";
import { getUserFollowers } from "../../components/Queries/getUserProfie";
import Loading from "../../components/Loading";
import OtherUser from "../../components/OtherUser";
import { useLocation } from "react-router-dom";

const ProfileFollowers = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(getUserFollowers, {
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
    <div className="ProfileFollowers">
      <div className="HeaderTitle">Followers</div>
      {data.user.NumbOfFollowing === 0 ? (
        <div className="ProfileDetailContent">
          <img
            src={boxmail}
            height="150px"
            width="150px"
            alt="boxmailicon"
          ></img>
          <span>You don't have any followers yet.</span>
        </div>
      ) : (
        <div className="ShowOtherUser">
          {data.user.FollowersList.map((follower, index) => (
            <OtherUser
              key={index}
              Otherusername={follower.username}
              Otherfullname={follower.fullname}
              OtherId={follower._id}
            ></OtherUser>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFollowers;
