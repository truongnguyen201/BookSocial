import React from "react";
import boxmail from "../../img/boxmail.png";

const ProfilePost = () => {
  return (
    <div className="ProfilePost">
      <div className="HeaderTitle">Posts</div>
      <div className="ProfileDetailContent">
        <img src={boxmail} height="150px" width="150px" alt="boxmailicon"></img>
        <span>You haven't posted any content yet.</span>
      </div>
    </div>
  );
};

export default ProfilePost;
