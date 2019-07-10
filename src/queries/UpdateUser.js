import gql from 'graphql-tag';

const UPDATE_USER_MUTATION = gql `
  mutation UpdateUser($name: String, $email: String, $username: String, $password: String) {
    updateUser(name: $name, email: $email, username: $username, password: $password) {
        name,
        username,
        email
    }
  }
`

export default UPDATE_USER_MUTATION;