import { gql } from "@apollo/client";

const addNewPost = gql`
  mutation(
    $Review: String!
    $Recommendation: String!
    $Booktitle: String!
    $authorID: ID!
    $genreID: ID!
    $userID: ID!
    $userCreator: String!
  ) {
    newPost(
      Review: $Review
      Recommendation: $Recommendation
      Booktitle: $Booktitle
      authorID: $authorID
      genreID: $genreID
      userID: $userID
      userCreator: $userCreator
    ) {
      Review
      Recommendation
    }
  }
`;

export { addNewPost };
