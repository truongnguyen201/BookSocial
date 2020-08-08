import React from "react";
import { Link, useParams } from "react-router-dom";

const ProfilePageNavBar = () => {
  const { profiledetail, username } = useParams();
  const navbardetail = [
    { linkparams: "main", title: "Profile" },
    { linkparams: "posts", title: "Posts" },
    { linkparams: "shares", title: "Shares" },
    { linkparams: "followers", title: "Followers" },
    { linkparams: "following", title: "Following" },
  ];
  return (
    <div className="ProfilePageNavBar">
      <ul>
        {navbardetail.map((detail, index) => (
          <Link key={index} to={`/profile/${username}/${detail.linkparams}`}>
            <li>
              <span>{detail.title}</span>
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
