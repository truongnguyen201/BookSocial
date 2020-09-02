import React from "react";
import avatarUserIcon from "../../../img/profile.svg";
import menupost from "../../../img/menupost.svg";
import { Link } from "react-router-dom";
import moment from "moment";
import { useMutation } from "@apollo/client";
import deletePost from "../../Queries/deletePost";
import { useSelector } from "react-redux";
import { getPostsDetail } from "../../Queries/getPostDetail";
import { getUserPost } from "../../Queries/getUserProfile";

const TopPost = (props) => {
  const { UserCreator, DateCreate, UserID, Fullname, postID } = props;
  const [deletepost] = useMutation(deletePost);
  const userprofile = useSelector((state) => state.UserProfile);

  const DeletePost = () => {
    if (userprofile.user._id === UserID) {
      deletepost({
        variables: {
          postID: postID,
          userID: userprofile.user._id,
        },
        refetchQueries: [
          { query: getPostsDetail },
          {
            query: getUserPost,
            variables: {
              _id: postID,
            },
          },
        ],
      });
    }
  };

  return (
    <div className="top-post">
      <div className="user-info">
        <div className="avatar" style={{ marginRight: "10px" }}>
          <img src={avatarUserIcon} alt="icon" width="40px" height="40px"></img>
        </div>
        <div className="post-username" style={{ fontSize: "15px" }}>
          <div style={{ fontWeight: "bold" }}>
            <Link
              to={{
                pathname: `/profile/${Fullname}/main`,
                state: {
                  fullname: Fullname,
                  id: UserID,
                },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {UserCreator}
            </Link>
          </div>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "'Merriweather Sans', sans-serif",
            }}
          >
            {moment(DateCreate, "LLLL").startOf("minute").fromNow()}
          </div>
        </div>
      </div>
      <div className="menu-post" onClick={DeletePost}>
        <img src={menupost} alt="icon" height="20px" width="20px"></img>
      </div>
    </div>
  );
};

export default TopPost;
