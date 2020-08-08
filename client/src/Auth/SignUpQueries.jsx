import { gql } from "@apollo/client";

const SignUpQueries = gql`
  mutation(
    $email: String!
    $username: String!
    $password: String!
    $fullname: String!
  ) {
    createUser(
      email: $email
      username: $username
      password: $password
      fullname: $fullname
    ) {
      email
      username
    }
  }
`;

export { SignUpQueries };
