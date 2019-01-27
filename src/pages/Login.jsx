import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import NavBar from '../components/NavBar';

import LOGIN_MUTATION from '../queries/LoginMutation';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show: false
        }
    }
    showPassword = e => {
        if(!this.state.show){
            e.target.innerText = 'visibility';
            document.getElementById('password-input').type = "text";
            this.setState({
                show: !this.state.show
            });
            return;
        }
        e.target.innerText = 'visibility_off';
        document.getElementById('password-input').type = "password";
        this.setState({
            show: !this.state.show
        });      
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
                        <span id='empty-error' className='error-message'></span>
                        <div className='username-field'>
                            <input
                                value={username}
                                onChange={e => this.setState({username: e.target.value})}
                                type="text"
                                placeholder="Enter your username"
                                id="username-input"/>
                            <label htmlFor="username-input"><i className='material-icons'>alternate_email</i></label>
                        </div>
                        <span id='username-error' className='error-message'></span>
                        <div className="password-field">
                            <input
                                value={password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                                placeholder="Enter your password"
                                id="password-input"/>
                            <label htmlFor="password-input"><i className='material-icons' style={{cursor:"pointer"}} onClick={e => this.showPassword(e)}>visibility_off</i></label>
                        </div>
                        <span id='password-error' className='error-message'></span>
                        <Mutation
                            mutation={LOGIN_MUTATION}
                            variables={{username,password}}
                            onCompleted={data => this.submitForm(data)}
                            onError = {error => {

                                let errorsList = {
                                    "username": [{
                                        "length": "Username must be 4 letters long!"
                                    }], 
                                    "password": [{
                                        "valid": "Password must have atleast one lowercase letter, one uppercase letter, one digit and one special character.",
                                        "length": "Password length must be 8-30!"
                                    }]
                                }

                                if(username === '' || password === '') {
                                    document.getElementById("empty-error").style.display = 'block';
                                    document.getElementById('empty-error').innerHTML = "Please, fill all the fields";
                                }
                                
                                if(password && password.length < 4) {
                                    document.getElementById("password-error").style.display = 'block';
                                    document.getElementById('password-error').innerHTML = errorsList.password[0]["length"];
                                }

                                const passwordRegex = /^(?=S*[a-z])(?=S*[A-Z])(?=\S*\d)(?=S*[^\W\s])\S{8,30}$/i;
                                let validPassword = passwordInput => passwordRegex.test(passwordInput);

                                if(password && !validPassword(password)) {
                                    document.getElementById("password-error").style.display = 'block';
                                    document.getElementById('password-error').innerHTML = errorsList.password[0].valid;
                                }

                                let message = error.message.toString().replace('GraphQL error: ','');
                                if(username && message.includes('username')) {
                                    document.getElementById("username-error").style.display = 'block';
                                    document.getElementById('username-error').innerHTML = message;
                                }

                                if(password && message.includes('password')){
                                    document.getElementById("password-error").style.display = 'block';
                                    document.getElementById('password-error').innerHTML = message;
                                }

                                setTimeout(() => {
                                    document.getElementById("empty-error").style.display = 'none';
                                    document.getElementById("username-error").style.display = 'none';
                                    document.getElementById("password-error").style.display = 'none';
                                    },4000);
                            }}>                        
                            {mutation => <button className='btn' onClick={mutation}>Login</button>}
                        </Mutation>
                    </div>
                </div>
            </div>
        )
    }
}
