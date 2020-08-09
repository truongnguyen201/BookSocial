import React from "react";
import boxmail from "../../img/boxmail.png";

const ProfileFollowers = () => {
  return (
    <div className="ProfileFollowers">
      <div className="HeaderTitle">Followers</div>
      <div className="ProfileDetailContent">
        <img src={boxmail} height="150px" width="150px" alt="boxmailicon"></img>
        <span>You don't have followers yet</span>
      </div>
    </div>
  );
};

export default ProfileFollowers;
