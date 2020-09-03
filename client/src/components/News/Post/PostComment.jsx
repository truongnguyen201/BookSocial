import React, { useState } from "react";
import avatarUserIcon from "../../../img/profile.svg";
import unVotedIcon from "../../../img/star.svg";
import votedIcon from "../../../img/vote.svg";
import replyIcon from "../../../img/reply.svg";
import menuaction from "../../../img/menupost.svg";
import CommentPart from "./CommentPart";
import { useMutation } from "@apollo/client";
import addReplyComment from "../../Queries/addReplyComment";
import { useSelector } from "react-redux";
import getComment from "../../Queries/getComment";
import TextareaAutosize from "react-textarea-autosize";
import {
  deletePostComment,
  deleteReplyComment,
} from "../../Queries/deleteComment";

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

  const userprofile = useSelector((state) => state.UserProfile.user);
  const [addreplycomment] = useMutation(addReplyComment);

  const AddReplyComment = (e) => {
    if (e.key === "Enter") {
      if (replyContent !== "") {
        replyContent.trim();
        e.preventDefault();
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
        setReplyContent("");
      }
    }
  };

  let voteIcon;
  let replyVoteIcon;

  isVoted ? (voteIcon = votedIcon) : (voteIcon = unVotedIcon);

  replyVoted ? (replyVoteIcon = votedIcon) : (replyVoteIcon = unVotedIcon);
  const replycommentaction = (reply) => {
    return () => {
      console.log(reply.userID.username);
      setReplyContent("");
      setReplyCommented(!replyCommented);
    };
  };

  const [deletepostcomment] = useMutation(deletePostComment);
  const [deletereplycomment] = useMutation(deleteReplyComment);

  const DeletePostComment = () => {
    deletepostcomment({
      variables: {
        postID: postID,
        postCommentID: commentID,
      },
      refetchQueries: [{ query: getComment, variables: { id: postID } }],
    });
  };
  const DeleteRelpyComment = (reply) => {
    return () => {
      deletereplycomment({
        variables: {
          postID: postID,
          postCommentID: commentID,
          replyCommentID: reply._id,
        },
        refetchQueries: [{ query: getComment, variables: { id: postID } }],
      });
    };
  };

  return (
    <div className="PostComment">
      <CommentPart
        user={commentUserID}
        time={commentTime}
        content={commentContent}
      >
        <div className="commentpart-action">
          <div className="voteicon" onClick={() => setIsVoted(!isVoted)}>
            <img src={voteIcon} height="15px" width="15px" alt="icon"></img>
            <span>1</span>
          </div>
          <div
            className="replyicon"
            onClick={() => setIsCommented(!isCommented)}
          >
            <img src={replyIcon} height="15px" width="15px" alt="icon"></img>
            <span>Reply</span>
          </div>
          {commentUserID._id === userprofile._id && (
            <div className="menu-action" onClick={DeletePostComment}>
              <img src={menuaction} height="15px" width="15px" alt="icon"></img>
            </div>
          )}
        </div>
        {replyComments.length > 0 &&
          replyComments.map((replycomment, index) => (
            <CommentPart
              key={index}
              content={replycomment.content}
              time={replycomment.time}
              user={replycomment.userID}
            >
              <div className="commentpart-action">
                <div
                  className="voteicon"
                  onClick={() => setReplyVoted(!replyVoted)}
                >
                  <img
                    src={replyVoteIcon}
                    height="15px"
                    width="15px"
                    alt="icon"
                  ></img>
                  <span>1</span>
                </div>
                <div
                  className="replyicon"
                  onClick={replycommentaction(replycomment)}
                >
                  <img
                    src={replyIcon}
                    height="15px"
                    width="15px"
                    alt="icon"
                  ></img>
                  <span>Reply</span>
                </div>
                {replycomment.userID._id === userprofile._id && (
                  <div
                    className="menu-action"
                    onClick={DeleteRelpyComment(replycomment)}
                  >
                    <img
                      src={menuaction}
                      height="15px"
                      width="15px"
                      alt="icon"
                    ></img>
                  </div>
                )}
              </div>
            </CommentPart>
          ))}
        {(isCommented || replyCommented) && (
          <div className="replycomment">
            <div className="avatar" style={{ width: "8%" }}>
              <img
                src={avatarUserIcon}
                alt="icon"
                height="30px"
                width="30px"
              ></img>
            </div>
            <div style={{ width: "92%" }}>
              <TextareaAutosize
                type="text"
                placeholder="Viet Binh Luan"
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={AddReplyComment}
                minRows={1}
                value={replyContent}
                autoFocus
              />
            </div>
          </div>
        )}
      </CommentPart>
    </div>
  );
};

export default PostComment;
