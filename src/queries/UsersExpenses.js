import gql from 'graphql-tag';

const USERS_EXPENSES = gql `
  query usersExpenses($category: String, $search: String, $type: String) {
    usersExpenses(category: $category, search: $search, type: $type) {
            id
            spentOn
            amount
            type
            description
            category
            createdAt
        }
    }
`;

export default USERS_EXPENSES;