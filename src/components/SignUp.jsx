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
                        <div className='name-field'>
                            <label><i className='material-icons'>account_circle</i></label>
                            <input
                                value={name}
                                onChange={e => this.setState({name: e.target.value})}
                                type="text"
                                placeholder="Enter your name"/>
                        </div>
                        <div className='email-field'>
                            <label><i className='material-icons'>email</i></label>
                            <input
                                value={email}
                                onChange={e => this.setState({email: e.target.value})}
                                type="text"
                                placeholder="Enter your email"/>
                        </div>
                        
                        <div className="username-field">
                            <label><i className='material-icons'>alternate_email</i></label>
                            <input
                                value={username}
                                onChange={e => this.setState({username: e.target.value})}
                                type="text"
                                placeholder="Enter your username"/>
                        </div>
                        <div className='password-field'>
                            <label><i className='material-icons'>remove_red_eye</i></label>
                            <input
                                value={password}
                                onChange={e => this.setState({password: e.target.value})}
                                type="password"
                                placeholder="Enter your password"/>
                        </div>
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
                            variables={{
                            username,
                            password,
                            name,
                            email,
                            gender
                        }}
                            onCompleted={data => this.submitForm(data)}>
                            {mutation => <button className='btn' onClick={mutation}>Sign Up</button>}
                        </Mutation>
                    </div>
                </div>

            </div>
        )
    }
}
