import { gql } from "@apollo/client";

export const getUserProfile = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      NumbOfFollowing
      NumbOfFollowers
      NumbOfPost
    }
  }
`;

export const getUserPost = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
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
      NumbOfPost
    }
  }
`;

export const getUserFollowers = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      FollowersList {
        username
        _id
      }
      NumbOfFollowers
    }
  }
`;
export const getUserFollowing = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      FollowingList {
        username
        _id
      }
      NumbOfFollowing
    }
  }
`;

export default {
  getUserProfile,
  getUserFollowers,
  getUserFollowing,
  getUserPost,
};
