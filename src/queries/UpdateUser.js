import gql from 'graphql-tag';

const UPDATE_USER_MUTATION = gql `
  mutation UpdateUser($balance: String) {
    updateUser(balance: $balance) {
        balance
    }
  }
`

export default UPDATE_USER_MUTATION;