import gql from 'graphql-tag';

const DELETE_EXPENSE_MUTATION = gql `
  mutation DeleteExpense($id: String!){
    deleteExpense(id: $id) {
      spentOn
    }
  }
`

export default DELETE_EXPENSE_MUTATION;