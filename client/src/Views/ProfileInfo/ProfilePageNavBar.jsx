import React from "react";
import { Link, useParams } from "react-router-dom";

const ProfilePageNavBar = (props) => {
  const { profiledetail, username } = useParams();
  const { NumbOfFollowing, NumbOfFollowers, NumbOfPost, UserID } = props;

  const navbardetail = [
    { linkparams: "main", title: "Profile" },
    { linkparams: "posts", title: "Posts" },
    { linkparams: "shares", title: "Shares" },
    { linkparams: "followers", title: "Followers" },
    { linkparams: "following", title: "Following" },
  ];

  const NumbShow = (detail) => {
    if (detail === "Profile") {
      return;
    } else if (detail === "Posts") {
      return NumbOfPost;
    } else if (detail === "Shares") {
      return "0";
    } else if (detail === "Followers") {
      return NumbOfFollowers;
    } else if (detail === "Following") {
      return NumbOfFollowing;
    }
  };
  return (
    <div className="ProfilePageNavBar">
      <ul>
        {navbardetail.map((detail, index) => (
          <Link
            key={index}
            to={{
              pathname: `/profile/${username}/${detail.linkparams}`,
              state: {
                fullname: username,
                id: UserID,
              },
            }}
          >
            <li>
              <span>
                {NumbShow(detail.title)} {detail.title}
              </span>
              {profiledetail === detail.linkparams && (
                <div className="bar"></div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePageNavBar;
