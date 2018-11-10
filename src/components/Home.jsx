import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import NavBar from './NavBar';

// Ant Design
import {
    Layout,
    Row,
    Col,
    Button
} from 'antd';

export default class Home extends Component {
    render() {
        return (
            <Layout className="layout">
                <NavBar />
                <main id="homepage-content">
                <Row gutter={16} >
                    <Col span={12}>
                        <h1 id="heading">Easily manage your expenses.</h1>
                        <Button type="primary" size="large"><Link to='/login'>LOGIN</Link></Button>
                    </Col>
                    <Col span={12}>
                        <img src={process.env.PUBLIC_URL + '/images/illo.svg'} alt="" id="homepage-illo"/>
                    </Col>
                    </Row>
                </main>
            </Layout>
        )
    }
}
