import React, {Component} from 'react';

import NavBar from './NavBar';

// Ant Design
import {
    Layout
} from 'antd';

export default class Home extends Component {
    render() {
        return (
            <Layout className="layout">
                <NavBar />
            </Layout>
        )
    }
}
