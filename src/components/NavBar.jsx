import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Ant Design
import {Layout} from 'antd';

const {Header} = Layout;

export default class NavBar extends Component {
    render() {
        return (
            <Header>
                <span className="logo">Expense Manager</span>
                <ul className="nav-items">
                    <li>
                        <Link to="/login">LOGIN</Link>
                    </li>
                    <li>
                        <Link to="/signup">SINGUP</Link>
                    </li>
                </ul>
            </Header>
        )
    }
}
