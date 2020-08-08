import React from "react";
import exampleBook from "../../../img/exampleBook.jpg";

const MiddlePost = (props) => {
  let { author, Review, Recommendation, genre, Booktitle } = props;

  return (
    <div className="MiddlePost" style={{ padding: "10px", display: "flex" }}>
      <div>
        <img src={exampleBook} width="100px" height="auto" alt="imgBook"></img>
      </div>
      <div className="Info" style={{ marginLeft: "20px" }}>
        <div>
          <strong>Title</strong>: {Booktitle}
        </div>
        <div>
          <strong>Author</strong>: {author}
        </div>
        <div>
          <strong>Genre</strong>: {genre} book
        </div>

        <div>
          <strong>My Review</strong>:{Review}
        </div>
        <div>
          <strong> Recommendation</strong>: {Recommendation}
        </div>
      </div>
    </div>
  );
};

export default MiddlePost;
