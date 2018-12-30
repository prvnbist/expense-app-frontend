import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="container-fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/"><img src="https://res.cloudinary.com/prvnbist/image/upload/v1546179938/Group_ovez0w.png" alt="Expense Manager"/> Expense Manager</Link>
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
