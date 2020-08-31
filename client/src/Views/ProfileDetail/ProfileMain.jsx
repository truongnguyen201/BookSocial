import React from "react";
import boxmail from "../../img/boxmail.png";
import { useQuery } from "@apollo/client";
import { getUserPost } from "../../components/Queries/getUserProfile";
import Loading from "../../components/Loading";
import Post from "../../components/News/Post/Post";
import { useLocation } from "react-router-dom";

const ProfileMain = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(getUserPost, {
    variables: { _id: location.state.id },
  });

  if (loading)
    return (
      <div className="Posts">
        <Loading></Loading>
      </div>
    );
  if (error) return <div className="Posts">Error :(</div>;

  return (
    <div className="ProfileMain">
      <div className="HeaderTitle">Profile</div>

      {data.user.NumbOfPost === 0 ? (
        <div className="ProfileDetailContent">
          <img
            src={boxmail}
            height="150px"
            width="150px"
            alt="boxmailicon"
          ></img>
          <span>You haven't posted, shared and review any content yet.</span>
        </div>
      ) : (
        <div className="Posts">
          {data.user.posts.map((userpost, index) => (
            <div key={index}>
              <Post
                postID={userpost._id}
                author={userpost.author.name}
                Review={userpost.Review}
                Recommendation={userpost.Recommendation}
                genre={userpost.genre.GenreTitle}
                Booktitle={userpost.Booktitle}
                UserCreator={userpost.userCreator}
                UserID={userpost.user._id}
                DateCreate={userpost.date}
                Fullname={userpost.user.fullname}
              ></Post>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileMain;
