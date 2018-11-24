import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import NavBar from './NavBar';

import SIGNUP_MUTATION from '../queries/SignUpMutation';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            email: '',
            gender: 'M'
        }
    }
    submitForm = ({signup}) => {
        localStorage.clear();
        localStorage.setItem('access_token', signup);
        this
            .props
            .history
            .push('/dashboard');
    }
    render() {
        const {username, password, name, email, gender} = this.state;
        return (
            <div>
                <NavBar/>
                <div  className="container form form-signup">
                    <div>
                        <span id='empty-error' className='error-message'></span>
                        <div className='name-field'>
                            <label><i className='material-icons'>account_circle</i></label>
                            <input
                                value={name}
                                onChange={e => this.setState({name: e.target.value})}
                                type="text"
                                placeholder="Enter your name"/>
                        </div>
                        <span id='name-error' className='error-message'></span>
                        <div className='email-field'>
                            <label><i className='material-icons'>email</i></label>
                            <input
                                value={email}
                                onChange={e => this.setState({email: e.target.value})}
                                type="text"
                                placeholder="Enter your email"/>
                        </div>
                        <span id='email-error' className='error-message'></span>
                        <div className="username-field">
                            <label><i className='material-icons'>alternate_email</i></label>
                            <input
                                value={username}
                                onChange={e => this.setState({username: e.target.value})}
                                type="text"
                                placeholder="Enter your username"/>
                        </div>
                        <span id='username-error' className='error-message'></span>
                        <div className='password-field'>
                            <label><i className='material-icons'>remove_red_eye</i></label>
                            <input
                                value={password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                                placeholder="Enter your password"/>
                        </div>
                        <span id='password-error' className='error-message'></span>
                        <div className="select-field">
                            <select
                                className="select-dropdown"
                                value={gender}
                                onChange={e => this.setState({gender: e.target.value})}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <Mutation
                            mutation={SIGNUP_MUTATION}
                            variables={{username,password,name,email,gender}}
                            onCompleted={data => this.submitForm(data)}
                            onError = {error => {                                
                                let errorsList = {
                                    "name" : [{
                                        "length": "Name must be 4 letters long!"
                                    }],
                                    "email" : [{
                                        "valid": "Email must be a valid email!",
                                        "exists": "Email already exists!",
                                    }], 
                                    "username": [{
                                        "valid": "Username must be a valid email!",
                                        "exists": "Username already exists!",
                                        "length": "Username must be 4 letters long!"
                                    }], 
                                    "password": [{
                                        "valid": "Password must have atleast one lowercase letter, one uppercase letter, one digit and one special character.",
                                        "length": "Password length must be 8-30!"
                                    }]
                                }

                                if(username === '' || password === '' || email === '' || name === '') {
                                    document.getElementById("empty-error").style.display = 'block';
                                    document.getElementById('empty-error').innerHTML = "Please, fill all the fields";
                                }

                                if(name && name.length < 4) {
                                    document.getElementById("name-error").style.display = 'block';
                                    document.getElementById('name-error').innerHTML = errorsList.name[0].length;
                                }

                                if(username && username.length < 4) {
                                    document.getElementById("username-error").style.display = 'block';
                                    document.getElementById('username-error').innerHTML = errorsList.username[0].length;
                                }                                
                                if(error.message.includes("Username already exists.")) {
                                    document.getElementById("username-error").style.display = 'block';
                                    document.getElementById('username-error').innerHTML = errorsList.username[0].exists;
                                }

                                const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                                let validEmail = emailInput => regex.test(emailInput);

                                if(email && !validEmail(email)) {
                                    document.getElementById("email-error").style.display = 'block';
                                    document.getElementById('email-error').innerHTML = errorsList.email[0].valid;
                                }

                                if(validEmail(email) && error.message.includes("Email already exists.")) {
                                    document.getElementById("email-error").style.display = 'block';
                                    document.getElementById('email-error').innerHTML = errorsList.email[0].exists;
                                }

                                if(password.length < 4 && password !== '') {
                                    document.getElementById("password-error").style.display = 'block';
                                    document.getElementById('password-error').innerHTML = errorsList.password[0].length;
                                }

                                setTimeout(() =>{
                                    document.getElementById("empty-error").style.display = 'none';
                                    document.getElementById("name-error").style.display = 'none';
                                    document.getElementById("username-error").style.display = 'none';
                                    document.getElementById("password-error").style.display = 'none';
                                    document.getElementById("email-error").style.display = 'none';
                                    },4000);
                            }}>         
                            {mutation => <button className='btn' onClick={mutation}>Sign Up</button>}
                        </Mutation>
                    </div>
                </div>

            </div>
        )
    }
}
