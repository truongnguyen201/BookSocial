import { gql } from "@apollo/client";

export const UpVote = gql`
  mutation($postID: ID!, $userID: ID!) {
    upVote(postID: $postID, userID: $userID) {
      state
    }
  }
`;

export const UnVote = gql`
  mutation($postID: ID!, $userID: ID!) {
    unVote(postID: $postID, userID: $userID) {
      state
    }
  }
`;

export default { UpVote, UnVote };
