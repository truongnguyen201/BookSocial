import { gql } from "@apollo/client";

const getVote = gql`
  query Post($id: ID!) {
    post(id: $id) {
      rateCount
      userVoted
    }
  }
`;
export default getVote;
