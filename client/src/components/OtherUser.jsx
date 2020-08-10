import React from "react";
import AvatarIcon from "../img/profile.svg";

const OtherUser = (props) => {
  const { Otherusername } = props;

  return (
    <div className="OtherUser">
      <div className="AvatarOtherUser">
        <img src={AvatarIcon} alt="avatar" height="40px" width="40px"></img>
      </div>
      <div className="OtherUserName">
        <span>{Otherusername}</span>
        <div>Intro</div>
      </div>

      <div className="FollowPart">
        <div>+ Follow</div>
      </div>
    </div>
  );
};

export default OtherUser;
