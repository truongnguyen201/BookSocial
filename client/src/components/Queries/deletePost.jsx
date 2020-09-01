import { gql } from "@apollo/client";

const deletePost = gql`
  mutation($postID: ID!) {
    deletePost(postID: $postID) {
      state
    }
  }
`;
export default deletePost;
