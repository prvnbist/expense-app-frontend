import gql from 'graphql-tag';

const CURRENT_USER = gql `
  query currentUser {
    me {
        id
        name
        username
        email
        gender
        balance
        expenses {
          id
          spentOn
          amount
          description
          category
          createdAt
        }
      }
  }
`;

export default CURRENT_USER;