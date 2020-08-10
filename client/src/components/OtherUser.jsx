import React, { useState } from "react";
import AvatarIcon from "../img/profile.svg";
import { Link } from "react-router-dom";

const OtherUser = (props) => {
  const { Otherusername, Otherfullname, OtherId } = props;
  console.log(Otherfullname);
  const [followingState, setfollowingState] = useState(false);
  return (
    <div className="OtherUser">
      <div className="AvatarOtherUser">
        <img src={AvatarIcon} alt="avatar" height="40px" width="40px"></img>
      </div>
      <div className="OtherUserName">
        <span>
          <Link
            to={{
              pathname: `/profile/${Otherfullname}/main`,
              state: {
                id: OtherId,
                fullname: Otherfullname,
              },
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            {Otherusername}
          </Link>
        </span>
        <div>Intro</div>
      </div>

      <div className="FollowPart">
        <div
          className={followingState ? "Following" : "Follow"}
          onClick={() => setfollowingState(!followingState)}
        >
          {followingState ? "Following" : "+ Follow"}
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
