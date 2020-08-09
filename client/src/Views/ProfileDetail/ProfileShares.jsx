import React from "react";
import boxmail from "../../img/boxmail.png";

const ProfileShares = () => {
  return (
    <div className="ProfileShares">
      <div className="HeaderTitle">Shares</div>
      <div className="ProfileDetailContent">
        <img src={boxmail} height="150px" width="150px" alt="boxmailicon"></img>
        <span>You haven't shared anything yet</span>
      </div>
    </div>
  );
};

export default ProfileShares;
