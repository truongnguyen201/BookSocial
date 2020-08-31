import React, { useState, useRef } from "react";
import isNotCommented from "../../../img/comment.svg";
import avatarUserIcon from "../../../img/profile.svg";
import isCommentedIcon from "../../../img/isCommented.svg";
import unVotedIcon from "../../../img/star.svg";
import votedIcon from "../../../img/vote.svg";
import CommentPart from "./CommentPart";
import { useMutation } from "@apollo/client";
import addReplyComment from "../../Queries/addReplyComment";
import { useSelector } from "react-redux";
import getComment from "../../Queries/getComment";

const PostComment = (props) => {
  const {
    commentUserID,
    commentContent,
    commentTime,
    replyComments,
    commentID,
    postID,
  } = props;
  const [isCommented, setIsCommented] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [replyVoted, setReplyVoted] = useState(false);
  const [replyCommented, setReplyCommented] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const replyCommentRef = useRef();

  const userprofile = useSelector((state) => state.UserProfile.user);
  const [addreplycomment] = useMutation(addReplyComment);

  const AddReplyComment = (e) => {
    if (e.key === "Enter") {
      if (replyContent !== "") {
        replyContent.trim();
        addreplycomment({
          variables: {
            userID: userprofile._id,
            content: replyContent,
            postID: postID,
            postCommentID: commentID,
          },
          refetchQueries: [
            {
              query: getComment,
              variables: {
                id: postID,
              },
            },
          ],
        });
        replyCommentRef.current.value = "";
      }
    }
  };

  let commentIcon;
  let voteIcon;
  let replyVoteIcon;
  let replyCommentIcon;
  isCommented
    ? (commentIcon = isCommentedIcon)
    : (commentIcon = isNotCommented);
  isVoted ? (voteIcon = votedIcon) : (voteIcon = unVotedIcon);

  replyCommented
    ? (replyCommentIcon = isCommentedIcon)
    : (replyCommentIcon = isNotCommented);
  replyVoted ? (replyVoteIcon = votedIcon) : (replyVoteIcon = unVotedIcon);

  return (
    <div className="PostComment">
      <CommentPart
        user={commentUserID}
        time={commentTime}
        content={commentContent}
      >
        <div
          className="commentpart-action"
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
            height="15px"
            width="15px"
            alt="icon"
            onClick={() => setIsVoted(!isVoted)}
          ></img>
          <img
            src={commentIcon}
            height="15px"
            width="15px"
            alt="icon"
            onClick={() => setIsCommented(!isCommented)}
          ></img>
        </div>
        {replyComments.length > 0 &&
          replyComments.map((replycomment, index) => (
            <CommentPart
              key={index}
              content={replycomment.content}
              time={replycomment.time}
              user={replycomment.userID}
            >
              <div
                className="commentpart-action"
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
                  src={replyVoteIcon}
                  height="15px"
                  width="15px"
                  alt="icon"
                  onClick={() => setReplyVoted(!replyVoted)}
                ></img>
                <img
                  src={replyCommentIcon}
                  height="15px"
                  width="15px"
                  alt="icon"
                  onClick={() => setReplyCommented(!replyCommented)}
                ></img>
              </div>
            </CommentPart>
          ))}
        {(isCommented || replyCommented) && (
          <div
            className="replycomment"
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
                height="30px"
                width="30px"
              ></img>
            </div>
            <div style={{ width: "92%" }}>
              <input
                type="text"
                placeholder="Viết Phản Hồi"
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={AddReplyComment}
                ref={replyCommentRef}
                style={{
                  width: "80%",
                  border: "1px solid #d6d6d6",
                  padding: "5px 20px",
                  borderRadius: "20px",
                  outline: "none",
                }}
              ></input>
            </div>
          </div>
        )}
      </CommentPart>
    </div>
  );
};

export default PostComment;
