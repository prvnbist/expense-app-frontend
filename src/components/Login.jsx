import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import NavBar from './NavBar';

// Ant Design
import { Input, Row, Col, Button, Layout } from 'antd';

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
        document.getElementsByClassName('error-message').innerHTML= '';
        localStorage.clear();
        localStorage.setItem('access_token',login);
		this.props.history.push('/dashboard');
    }
    render() {
        const {username, password} = this.state;
        return (
            <Layout className="layout">
                <NavBar/>
            <div className="wrapper center-content">
                <Row gutter={16} className="loginForm">
                    <Col span={24}>
                    <label className="inputLabel">Username</label>
                    <Input
                        value={username}
                        onChange={e => this.setState({username: e.target.value})}
                        type="text"
                        placeholder="Enter your username"/>
                    <span id='username-error' className='error-message'></span>
                    <label className="inputLabel">Password</label>
                    <Input
                        value={password}
                        onChange={e => this.setState({password: e.target.value})}
                        type="password"
                        placeholder="Enter your password"/>
                    <span id='password-error' className='error-message'></span>
                    <Mutation
                        mutation={LOGIN_MUTATION}
                        variables={{username,password}}
                        onCompleted={data => this.submitForm(data)}
                        onError = {error => {
                            let message = error.message.toString().replace('GraphQL error: ','');
                            if(message.includes('username')) {
                                document.getElementById("username-error").style.display = 'block';
                                document.getElementById('username-error').innerHTML = message;
                            }
                            else if(message.includes('password')){
                                document.getElementById("password-error").style.display = 'block';
                                document.getElementById('password-error').innerHTML = message;
                            }
                            setTimeout(() =>{
                                document.getElementById("username-error").style.display = 'none';
                                document.getElementById("password-error").style.display = 'none';
                                },2000);
                        }}>                        
                        {mutation => <Button type="primary" size="large" onClick={mutation}>Login</Button>}
                    </Mutation>
                    </ Col>
                </Row>
            </div>
            </Layout>
        )
    }
}
