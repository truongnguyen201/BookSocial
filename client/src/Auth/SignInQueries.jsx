import { gql } from "@apollo/client";

const SignInQueries = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      fullname
      username
      token
      _id
    }
  }
`;

export { SignInQueries };
