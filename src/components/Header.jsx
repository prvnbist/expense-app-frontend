import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';
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
          spentOn
        }
      }
  }
`;

const LoggedInUser = () => (
    <Query query={CURRENT_USER}>
        {({loading, error, data}) => {
            if (loading) 
                return "Loading...";
            if (error) 
                return `Error! ${error.message}`;
            const {name} = data.me;
            return name;
        }}
    </Query>
);

export default class Header extends Component {
    logOut = () => {
        localStorage.removeItem('access_token');
    }
    render() {
        return (
            <header>
                <nav>
                    <span id="logo">Expense Manager</span>
                    <div id="profile-options">
                        <span id="user-name"><LoggedInUser /></span>
                        <Link to="/"><button id="logout" onClick={this.logOut}>Logout</button></Link>
                    </div>
                </nav>
                <div id="total-expenses">
                    <div id="income">
                        <label htmlFor="#">INCOME</label>
                        <div className="expense-wrapper">
                            <input type="text" placeholder="Not Set" disabled/>
                            <div className="expense-option">INR</div>
                        </div>
                    </div>
                    <div id="total-spent">
                        <label htmlFor="#">TOTAL SPENT</label>
                        <div className="expense-wrapper">
                            <input type="text" placeholder="0" disabled/>
                            <div className="expense-option">OCT</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
