import React, { useState } from "react";
import shareIcon from "../../../img/tag.svg";
import isNotCommented from "../../../img/comment.svg";
import avatarUserIcon from "../../../img/profile.svg";
import isCommentedIcon from "../../../img/isCommented.svg";
import unVotedIcon from "../../../img/star.svg";
import votedIcon from "../../../img/vote.svg";

const BotttomPost = () => {
  const [isCommented, setIsCommented] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  let commentIcon;
  let voteIcon;
  isCommented
    ? (commentIcon = isCommentedIcon)
    : (commentIcon = isNotCommented);

  isVoted ? (voteIcon = votedIcon) : (voteIcon = unVotedIcon);
  return (
    <div className="BottomPost" style={{ padding: "10px 0px" }}>
      <div
        className="Actions"
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "5px",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <img
          src={voteIcon}
          height="20px"
          width="20px"
          alt="icon"
          onClick={() => setIsVoted(!isVoted)}
        ></img>
        <img
          src={commentIcon}
          height="20px"
          width="20px"
          alt="icon"
          onClick={() => setIsCommented(!isCommented)}
          style={{ marginLeft: "30px" }}
        ></img>
        <img
          src={shareIcon}
          height="20px"
          width="20px"
          alt="icon"
          style={{ marginLeft: "30px" }}
        ></img>
      </div>
      {isCommented && (
        <div>
          <div
            className="horizontal-line-bottom-post"
            style={{
              width: "100%",
              borderBottom: "1px solid #d6d6d6",
              textAlign: "center",
              lineHeight: "0.3em",
              margin: "15px 0px",
            }}
          ></div>
          <div
            className="comment"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div className="avatar" style={{ width: "10%" }}>
              <img
                src={avatarUserIcon}
                alt="icon"
                height="35px"
                width="35px"
              ></img>
            </div>
            <div style={{ width: "90%" }}>
              <input
                type="text"
                placeholder="Viết Bình luận"
                style={{
                  width: "80%",
                  border: "1px solid #d6d6d6",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  outline: "none",
                }}
              ></input>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotttomPost;
