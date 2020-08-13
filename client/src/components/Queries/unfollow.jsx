import { gql } from "@apollo/client";

const unfollow = gql`
  mutation($userID: ID!, $unFollowid: ID!) {
    unfollow(userID: $userID, unFollowid: $unFollowid) {
      state
    }
  }
`;

export default unfollow;
