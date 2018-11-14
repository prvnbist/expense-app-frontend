import gql from 'graphql-tag';

const CURRENT_USER = gql `
  query currentUser {
    me {
        id
        name
        username
        email
        gender
        expenses {
          id
          spentOn
          amount
          description
          category
        }
      }
  }
`;

export default CURRENT_USER;