import gql from 'graphql-tag';

const LOGIN_MUTATION = gql `
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export default LOGIN_MUTATION;