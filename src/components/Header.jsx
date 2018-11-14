import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';

import CURRENT_USER from './queries/currentUser';

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
                        <Query query={CURRENT_USER}>
                            {({client,loading, error, data:{me}}) => {
                                if (loading) 
                                    return "Loading...";
                                if (error) 
                                    return `Error! ${error.message}`;
                                return <React.Fragment>
                                    <span id="user-name">{me.name}</span>
                                    <Link to="/"><button id="logout" onClick={() => {this.logOut();client.resetStore()}}>Logout</button></Link>
                                </React.Fragment>
                            }}
                        </Query>
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
