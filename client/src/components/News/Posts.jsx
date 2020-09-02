import React from "react";
import Post from "./Post/Post";
import { useQuery } from "@apollo/client";
import { getPostsDetail } from "../Queries/getPostDetail";
import Loading from "../Loading";
import { useSelector } from "react-redux";

const Posts = () => {
  const { loading, error, data } = useQuery(getPostsDetail, {
    fetchPolicy: "cache-and-network",
  });
  const userprofile = useSelector((state) => state.UserProfile.user);
  if (loading)
    return (
      <div className="Posts">
        <Loading></Loading>
      </div>
    );
  if (error) return <div className="Posts">Error :(</div>;

  return (
    <div className="Posts">
      {data?.posts.map((post, index) => (
        <div key={index}>
          <Post
            postID={post._id}
            author={post.author.name}
            Review={post.Review}
            Recommendation={post.Recommendation}
            genre={post.genre.GenreTitle}
            Booktitle={post.Booktitle}
            UserCreator={post.userCreator}
            UserID={post.user._id}
            DateCreate={post.date}
            Fullname={post.user.fullname}
            rateCount={post.rateCount}
            isVoted={
              post.userVoted.find((id) => id === userprofile._id) !== undefined
                ? true
                : false
            }
          ></Post>
        </div>
      ))}
    </div>
  );
};

export default Posts;
