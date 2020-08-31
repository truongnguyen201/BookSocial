import { gql } from "@apollo/client";

const addPostComment = gql`
  mutation($userID: ID!, $content: String!, $postID: ID!) {
    addPostComment(userID: $userID, content: $content, postID: $postID) {
      state
    }
  }
`;

export default addPostComment;
