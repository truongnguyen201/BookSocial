import React from "react";
import avatarUserIcon from "../../../img/profile.svg";
import { Link } from "react-router-dom";
import moment from "moment";

const CommentPart = (props) => {
  const { user, time, content, children } = props;
  return (
    <div
      className="CommentPart"
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "10px 0px",
      }}
    >
      <div className="avatar" style={{ width: "8%" }}>
        <img src={avatarUserIcon} alt="icon" height="30px" width="30px"></img>
      </div>
      <div style={{ width: "90%" }}>
        <div
          style={{
            backgroundColor: "#F4F7F8",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", fontSize: "15px" }}>
            <div style={{ fontWeight: "bold" }}>
              <Link
                to={{
                  pathname: `/profile/${user.fullname}/main`,
                  state: {
                    fullname: user.fullname,
                    id: user._id,
                  },
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                {user.username}
              </Link>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "'Merriweather Sans', sans-serif",
              }}
            >
              {moment(time, "LLLL").startOf("minute").fromNow()}
            </div>
          </div>
          <div>{content}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CommentPart;
