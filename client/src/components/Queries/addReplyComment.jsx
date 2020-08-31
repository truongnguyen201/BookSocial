import { gql } from "@apollo/client";

const addReplyComment = gql`
  mutation(
    $userID: ID!
    $content: String
    $postID: ID!
    $postCommentID: String!
  ) {
    addReplyComment(
      userID: $userID
      content: $content
      postID: $postID
      postCommentID: $postCommentID
    ) {
      state
    }
  }
`;

export default addReplyComment;
