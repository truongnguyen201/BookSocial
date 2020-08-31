import React, { useState, useRef } from "react";
import shareIcon from "../../../img/tag.svg";
import isNotCommented from "../../../img/comment.svg";
import avatarUserIcon from "../../../img/profile.svg";
import isCommentedIcon from "../../../img/isCommented.svg";
import unVotedIcon from "../../../img/star.svg";
import votedIcon from "../../../img/vote.svg";
import PostComment from "./PostComment";
import { useLazyQuery, useMutation } from "@apollo/client";
import getComment from "../../Queries/getComment";
import addPostComment from "../../Queries/addPostComment";
import { useSelector } from "react-redux";

const BotttomPost = (props) => {
  const { postID } = props;

  const [isCommented, setIsCommented] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const commentRef = useRef();

  const userprofile = useSelector((state) => state.UserProfile.user);

  let commentIcon;
  let voteIcon;
  isCommented
    ? (commentIcon = isCommentedIcon)
    : (commentIcon = isNotCommented);

  isVoted ? (voteIcon = votedIcon) : (voteIcon = unVotedIcon);

  const [loaddingComment, { loading, error, data }] = useLazyQuery(getComment, {
    variables: { id: postID },
  });

  const [addComment] = useMutation(addPostComment);

  const addcomment = (e) => {
    if (e.key === "Enter") {
      if (commentContent !== "") {
        commentContent.trim();
        addComment({
          variables: {
            content: commentContent,
            postID: postID,
            userID: userprofile._id,
          },
          refetchQueries: [{ query: getComment, variables: { id: postID } }],
        });
        commentRef.current.value = "";
      }
    }
  };

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
          onClick={() => {
            loaddingComment();
            setIsCommented(!isCommented);
          }}
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
          {error && <div className="Posts">Error :(</div>}
          {loading ? (
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
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
                  marginTop: "15px",
                }}
              >
                <div className="avatar" style={{ width: "8%" }}>
                  <img
                    src={avatarUserIcon}
                    alt="icon"
                    height="36px"
                    width="36px"
                  ></img>
                </div>
                <div style={{ width: "92%" }}>
                  <input
                    type="text"
                    placeholder="Viet Binh Luan"
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={addcomment}
                    ref={commentRef}
                    style={{
                      width: "80%",
                      border: "1px solid #d6d6d6",
                      padding: "8px 20px",
                      borderRadius: "20px",
                      outline: "none",
                    }}
                  ></input>
                </div>
              </div>
              {data?.post.comments.length > 0 && (
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
              )}

              {data?.post.comments.length > 0 &&
                data?.post.comments.map((comment, index) => (
                  <PostComment
                    key={index}
                    postID={postID}
                    commentID={comment._id}
                    commentUserID={comment.userID}
                    commentContent={comment.content}
                    commentTime={comment.time}
                    replyComments={comment.replyComments}
                  ></PostComment>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BotttomPost;
