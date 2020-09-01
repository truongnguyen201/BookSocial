import { gql } from "@apollo/client";

export const UpVote = gql`
  mutation($postID: ID!) {
    upVote(postID: $postID) {
      state
    }
  }
`;

export const UnVote = gql`
  mutation($postID: ID!) {
    unVote(postID: $postID) {
      state
    }
  }
`;

export default { UpVote, UnVote };
