import React from "react";
import BottomPost from "./BotttomPost";
import TopPost from "./TopPost";
import MiddlePost from "./MiddlePost";

const Post = (props) => {
  let {
    author,
    Review,
    Recommendation,
    genre,
    Booktitle,
    UserCreator,
    UserID,
    DateCreate,
    Fullname,
    postID,
  } = props;
  return (
    <div className="Post">
      <TopPost
        DateCreate={DateCreate}
        UserCreator={UserCreator}
        UserID={UserID}
        Fullname={Fullname}
        postID={postID}
      ></TopPost>
      <MiddlePost
        author={author}
        Review={Review}
        Recommendation={Recommendation}
        genre={genre}
        Booktitle={Booktitle}
      ></MiddlePost>
      <BottomPost postID={postID}></BottomPost>
    </div>
  );
};

export default Post;
