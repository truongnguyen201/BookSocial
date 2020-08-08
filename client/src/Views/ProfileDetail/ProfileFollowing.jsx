import React from "react";
import boxmail from "../../img/boxmail.png";

const ProfileFollowing = () => {
  return (
    <div className="ProfileFollowing">
      <div className="HeaderTitle">Following</div>
      <div className="ProfileDetailContent">
        <img src={boxmail} height="150px" width="150px"></img>
        <span>You aren't following anyone yet.</span>
      </div>
    </div>
  );
};

export default ProfileFollowing;
