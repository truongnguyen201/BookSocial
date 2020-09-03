import { gql } from "@apollo/client";

export const deletePostComment = gql`
  mutation($postID: ID!, $postCommentID: ID!) {
    deletePostComment(postID: $postID, postCommentID: $postCommentID) {
      state
    }
  }
`;
export const deleteReplyComment = gql`
  mutation($postID: ID!, $postCommentID: ID!, $replyCommentID: ID!) {
    deleteReplyComment(
      postID: $postID
      postCommentID: $postCommentID
      replyCommentID: $replyCommentID
    ) {
      state
    }
  }
`;
export default { deletePostComment, deleteReplyComment };
