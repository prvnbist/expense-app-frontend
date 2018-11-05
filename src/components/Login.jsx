import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

// Ant Design
import { Input, Row, Col, Button } from 'antd';

const LOGIN_MUTATION = gql `
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    submitForm = ({login}) => {
        localStorage.clear();
        localStorage.setItem('access_token',login);
		this.props.history.push('/dashboard');
    }
    render() {
        const {username, password} = this.state;
        return (
            <div className="wrapper center-content">
                <Row gutter={16} className="loginForm">
                    <Col span={24}>
                    <label className="inputLabel">Username</label>
                    <Input
                        value={username}
                        onChange={e => this.setState({username: e.target.value})}
                        type="text"
                        placeholder="Enter your username"/>
                    <label className="inputLabel">Password</label>
                    <Input
                        value={password}
                        onChange={e => this.setState({password: e.target.value})}
                        type="password"
                        placeholder="Enter your password"/>
                    <Mutation
                        mutation={LOGIN_MUTATION}
                        variables={{username,password}}
                        onCompleted={data => this.submitForm(data)}>
                        {mutation => <Button type="primary" size="large" onClick={mutation}>Login</Button>}
                    </Mutation>
                    <span className="loginOption"> or <Link to="/signup">Sign Up</Link></span>
                    </ Col>
                </Row>
            </div>
        )
    }
}
