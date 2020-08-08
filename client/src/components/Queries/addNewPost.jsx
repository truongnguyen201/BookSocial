import { gql } from "@apollo/client";

const addNewPost = gql`
  mutation(
    $Review: String!
    $Recommendation: String!
    $Booktitle: String!
    $authorID: ID!
    $genreID: ID!
  ) {
    newPost(
      Review: $Review
      Recommendation: $Recommendation
      Booktitle: $Booktitle
      authorID: $authorID
      genreID: $genreID
    ) {
      Review
      Recommendation
    }
  }
`;

export { addNewPost };
