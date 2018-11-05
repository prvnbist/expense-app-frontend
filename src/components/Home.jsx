import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Ant Design
import {Row, Col, Button} from 'antd';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper center-content">
                <Row gutter={16} className="loginForm">
                    <Col span={24}>
                        <h1>Expense Manager</h1>
                        <Button type="primary" size="large" className="mr16">
                            <Link to="/login">LOGIN</Link>
                        </Button>
                        <Button type="primary" size="large">
                            <Link to="/signup">SIGN UP</Link>
                        </Button>
                    </ Col>
                </Row>
            </div>
        )
    }
}
