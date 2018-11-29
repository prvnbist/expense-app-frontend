import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import NavBar from './NavBar';

import LOGIN_MUTATION from '../queries/LoginMutation';

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
            <div>
                <NavBar/>
                <div className="container form form-login">
                    <div  className="form-center">
                        <div className='username-field'>
                            <input
                                value={username}
                                onChange={e => this.setState({username: e.target.value})}
                                type="text"
                                placeholder="Enter your username"
                                id="username-input"/>
                            <label htmlFor="username-input"><i className='material-icons'>account_circle</i></label>
                        </div>
                        <span id='username-error' className='error-message'></span>
                        <div className="password-field">
                            <input
                                value={password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                                placeholder="Enter your password"
                                id="password-input"/>
                            <label htmlFor="password-input"><i className='material-icons'>remove_red_eye</i></label>
                        </div>
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
                            {mutation => <button className='btn' onClick={mutation}>Login</button>}
                        </Mutation>
                    </div>
                </div>
            </div>
        )
    }
}
