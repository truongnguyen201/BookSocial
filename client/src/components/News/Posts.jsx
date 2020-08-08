import React from "react";
import Post from "./Post/Post";
import { useQuery } from "@apollo/client";
import { getPostsDetail } from "../Queries/getPostDetail";
import Loading from "../Loading";

const Posts = () => {
  const { loading, error, data } = useQuery(getPostsDetail);
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
            author={post.author.name}
            Review={post.Review}
            Recommendation={post.Recommendation}
            genre={post.genre.GenreTitle}
            Booktitle={post.Booktitle}
          ></Post>
        </div>
      ))}
    </div>
  );
};

export default Posts;
