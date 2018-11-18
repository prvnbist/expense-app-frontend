import gql from 'graphql-tag';

const ADD_EXPENSE_MUTATION = gql `
  mutation AddExpense($spentOn: String!, $category: String! $amount: String!, $description: String!){
    addExpense(spentOn:$spentOn,category:$category,amount:$amount,description:$description) {
      spentOn
    }
  }
`

export default ADD_EXPENSE_MUTATION;