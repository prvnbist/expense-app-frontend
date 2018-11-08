import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

// Ant Design
import {Layout} from 'antd';

const {Header} = Layout;

export default class NavBar extends Component {
    render() {
        return (
            <Header>
                <span className="logo">
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
            </Header>
        )
    }
}
