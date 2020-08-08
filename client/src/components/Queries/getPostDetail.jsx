import { gql } from "@apollo/client";

const getPostsDetail = gql`
  {
    posts {
      id
      Booktitle
      Review
      Recommendation
      genre {
        GenreTitle
      }
      author {
        name
      }
    }
  }
`;

export { getPostsDetail };
