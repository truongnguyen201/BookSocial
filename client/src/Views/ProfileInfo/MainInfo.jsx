import React from "react";
import AvatarIcon from "../../img/profile.svg";

const MainInfo = () => {
  return (
    <div className="MainInfo">
      <div className="Avatar">
        <img src={AvatarIcon} alt="avatar"></img>
      </div>
      <div className="UserName">{localStorage.getItem("username")}</div>
    </div>
  );
};

export default MainInfo;
