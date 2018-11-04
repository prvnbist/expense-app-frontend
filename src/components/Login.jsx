import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql `
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'shellshoreman',
            password: 'shell'
        }
    }
    submitForm = ({login}) => {
        // document.cookie = `access_token=Bearer ${login}`;
        localStorage.clear();
        localStorage.setItem('access_token',login);
    }
    render() {
        const {username, password} = this.state;
        return (
            <div>
                <label>Username</label>
                <input
                    value={username}
                    onChange={e => this.setState({username: e.target.value})}
                    type="text"
                    placeholder="Enter your username"/>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => this.setState({password: e.target.value})}
                    type="password"
                    placeholder="Enter your password"/>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{username,password}}
                    onCompleted={data => this.submitForm(data)}>
                    {mutation => (
                        <button onClick={mutation}>Login</button>
                    )}
                </Mutation>
            </div>
        )
    }
}
