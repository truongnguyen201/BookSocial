import React, { useState, useEffect } from "react";
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
import { UpVote, UnVote } from "../../Queries/Vote";
import getVote from "../../Queries/getVote";
import TextareaAutosize from "react-textarea-autosize";

const BotttomPost = (props) => {
  const { postID, rateCount, IsVoted } = props;

  const [isCommented, setIsCommented] = useState(false);
  const [isVoted, setIsVoted] = useState(IsVoted);
  const [commentContent, setCommentContent] = useState("");
  const [RateCount, setRateCount] = useState(rateCount);

  const userprofile = useSelector((state) => state.UserProfile.user);

  let commentIcon;
  let voteIcon;
  isCommented
    ? (commentIcon = isCommentedIcon)
    : (commentIcon = isNotCommented);

  isVoted ? (voteIcon = votedIcon) : (voteIcon = unVotedIcon);

  const [loadingComment, { loading, error, data }] = useLazyQuery(getComment, {
    variables: { id: postID },
  });

  const [loadingvote, res] = useLazyQuery(getVote, {
    variables: { id: postID },
  });

  const [addComment] = useMutation(addPostComment);
  const [upvote] = useMutation(UpVote);
  const [unvote] = useMutation(UnVote);

  const addcomment = (e) => {
    if (e.key === "Enter") {
      commentContent.trim();
      if (commentContent !== "") {
        e.preventDefault();
        addComment({
          variables: {
            content: commentContent,
            postID: postID,
            userID: userprofile._id,
          },
          refetchQueries: [{ query: getComment, variables: { id: postID } }],
        });
        setCommentContent("");
      }
    }
  };

  const voteAction = () => {
    setIsVoted(!isVoted);
    loadingvote();
    if (!isVoted) {
      upvote({
        variables: {
          postID: postID,
          userID: userprofile._id,
        },
        refetchQueries: [
          {
            query: getVote,
            variables: {
              id: postID,
            },
          },
        ],
      });
    } else {
      unvote({
        variables: {
          postID: postID,
          userID: userprofile._id,
        },
        refetchQueries: [
          {
            query: getVote,
            variables: {
              id: postID,
            },
          },
        ],
      });
      loadingvote();
    }
  };

  useEffect(() => {
    if (res.data !== undefined) {
      if (!res.loading) {
        setRateCount(res.data.post.rateCount);
      }
    }
  }, [res, userprofile]);

  return (
    <div className="BottomPost">
      <div className="Actions">
        <img src={voteIcon} alt="icon" onClick={voteAction}></img>
        <span>{RateCount}</span>
        <img
          src={commentIcon}
          alt="icon"
          onClick={() => {
            loadingComment();
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
              <div className="horizontal-line-bottom-post"></div>
              <div className="comment">
                <div className="avatar" style={{ width: "8%" }}>
                  <img
                    src={avatarUserIcon}
                    alt="icon"
                    height="36px"
                    width="36px"
                  ></img>
                </div>
                <div style={{ width: "92%" }}>
                  <TextareaAutosize
                    type="text"
                    placeholder="Viet Binh Luan"
                    onChange={(e) => setCommentContent(e.target.value)}
                    onKeyDown={addcomment}
                    minRows={1}
                    value={commentContent}
                    autoFocus
                  />
                </div>
              </div>
              {data?.post.comments.length > 0 && (
                <div className="horizontal-line-bottom-post"></div>
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
