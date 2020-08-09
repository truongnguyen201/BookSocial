import { gql } from "@apollo/client";

const getPostsDetail = gql`
  {
    posts {
      _id
      Booktitle
      Review
      Recommendation
      genre {
        GenreTitle
      }
      author {
        name
      }
      user {
        _id
      }
      userCreator
      date
    }
  }
`;

export { getPostsDetail };
