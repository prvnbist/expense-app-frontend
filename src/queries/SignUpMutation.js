import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql `
  mutation SignUpMutation($username: String!, $password: String!,$name:String!,$email:String!,$gender: String!) {
    signup(username: $username, password: $password, email: $email, name: $name, gender: $gender)
  }
`

export default SIGNUP_MUTATION;