import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="container-fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/"><img src="https://res.cloudinary.com/prvnbist/image/upload/v1561215489/Expense%20App/expense-logo.svg" alt="Expense Manager"/> Expense Manager</Link>
                    </span>
                </div>
            </nav>
        )
    }
}
