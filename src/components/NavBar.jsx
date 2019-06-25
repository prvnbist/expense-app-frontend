import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';
export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    logOut = () => {
        localStorage.removeItem('access_token');
    }
    render() {
        return (
            <nav className="container-fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/"><img
                            src="https://res.cloudinary.com/prvnbist/image/upload/v1561215489/Expense%20App/expense-logo.svg"
                            alt="Expense Manager"/>
                            Expense Manager</Link>
                    </span>
                    {this.props.show && <Query query={CURRENT_USER}>
                        {({client, loading, error, data: {
                                me
                            }}) => {
                            if (loading) 
                                return <div id='user-info-actions'>
                                    <span id="user-name">Loading...</span>
                                </div>;
                            if (error) 
                                return `Error! ${error.message}`;
                            return <div id='user-info-actions'>
                                <span id="user-name">{me.name}</span>
                                <Link to="/">
                                    <button
                                        id="logout"
                                        onClick={() => {
                                        this.logOut();
                                        client.resetStore()
                                    }}>Logout</button>
                                </Link>
                            </div>
                        }}
                    </Query>
}
                </div>
            </nav>
        )
    }
}
