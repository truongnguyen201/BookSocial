import { gql } from "@apollo/client";

const deletePost = gql`
  mutation($postID: ID!, $userID: ID!) {
    deletePost(postID: $postID, userID: $userID) {
      state
    }
  }
`;
export default deletePost;
