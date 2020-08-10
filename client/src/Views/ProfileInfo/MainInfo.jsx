import React from "react";
import AvatarIcon from "../../img/profile.svg";

const MainInfo = (props) => {
  const { username } = props;
  return (
    <div className="MainInfo">
      <div className="Avatar">
        <img src={AvatarIcon} alt="avatar"></img>
      </div>
      <div className="UserName">{username}</div>
    </div>
  );
};

export default MainInfo;
