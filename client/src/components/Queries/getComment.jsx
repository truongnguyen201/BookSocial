import { gql } from "@apollo/client";

const getComment = gql`
  query Post($id: ID!) {
    post(id: $id) {
      comments {
        _id
        userID {
          _id
          username
          fullname
        }
        content
        time
        replyComments {
          userID {
            _id
            username
            fullname
          }
          content
          time
        }
      }
    }
  }
`;

export default getComment;
