import { gql } from "@apollo/client";

export const getUserProfile = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      NumbOfFollowing
      NumbOfFollowers
      NumbOfPost
      username
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
          fullname
        }
        userCreator
        date
        userVoted
        rateCount
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
        fullname
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
        fullname
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
