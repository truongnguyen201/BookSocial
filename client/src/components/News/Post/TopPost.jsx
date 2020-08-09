import React from "react";
import avatarUserIcon from "../../../img/profile.svg";
import menupost from "../../../img/menupost.svg";

const TopPost = (props) => {
  const { UserCreator, DateCreate, UserID } = props;
  console.log(UserID);

  var diff = Math.abs(new Date() - DateCreate);
  console.log(diff);
  return (
    <div className="top-post" style={{ display: "flex" }}>
      <div className="user-info" style={{ display: "flex", width: "95%" }}>
        <div className="avatar" style={{ marginRight: "10px" }}>
          <img src={avatarUserIcon} alt="icon" width="40px" height="40px"></img>
        </div>
        <div className="post-username" style={{ fontSize: "15px" }}>
          <div style={{ fontWeight: "bold" }}>{UserCreator}</div>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            {DateCreate}
          </div>
        </div>
      </div>
      <div className="menu-post">
        <img src={menupost} alt="icon" height="20px" width="20px"></img>
      </div>
    </div>
  );
};

export default TopPost;
