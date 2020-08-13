import { gql } from "@apollo/client";

const follow = gql`
  mutation($userID: ID!, $followingid: ID!) {
    follow(userID: $userID, followingid: $followingid) {
      state
    }
  }
`;

export default follow;
