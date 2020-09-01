import { gql } from "@apollo/client";

const getRateCount = gql`
  query Post($id: ID!) {
    post(id: $id) {
      rateCount
    }
  }
`;
export default getRateCount;
