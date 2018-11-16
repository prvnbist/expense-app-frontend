import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="container-fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/">Expense Manager</Link>
                    </span>
                    <ul className="nav-items">
                        <li>
                            <NavLink to="/login">LOGIN</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">SIGNUP</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
