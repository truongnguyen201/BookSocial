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
  } = props;
  return (
    <div className="Post">
      <TopPost
        DateCreate={DateCreate}
        UserCreator={UserCreator}
        UserID={UserID}
        Fullname={Fullname}
      ></TopPost>
      <MiddlePost
        author={author}
        Review={Review}
        Recommendation={Recommendation}
        genre={genre}
        Booktitle={Booktitle}
      ></MiddlePost>
      <BottomPost></BottomPost>
    </div>
  );
};

export default Post;
