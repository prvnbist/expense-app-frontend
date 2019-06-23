import React from 'react';
import {Mutation} from 'react-apollo';
import {Formik} from 'formik';

import LOGIN_MUTATION from '../queries/LoginMutation';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            buttonText: "Login"
        }
    }
    showPassword = e => {
        if (!this.state.show) {
            e.target.innerText = 'visibility';
            document
                .getElementById('password-input')
                .type = "text";
            this.setState({
                show: !this.state.show
            });
            return;
        }
        e.target.innerText = 'visibility_off';
        document
            .getElementById('password-input')
            .type = "password";
        this.setState({
            show: !this.state.show
        });
    }
    submitForm = ({login}) => {
        localStorage.clear();
        localStorage.setItem('access_token', login);
        this
            .props
            .history
            .push('/dashboard');
    }
    render() {
        return (
            <div className="login">
                <h2 className="page-heading">Login to view your expenses.</h2>
                <Mutation mutation={LOGIN_MUTATION} onCompleted={data => this.submitForm(data)}>
                    {loginMutation => <Formik
                        initialValues={{
                        username: '',
                        password: ''
                    }}
                        validate={values => {
                        let errors = {};
                        if (values.username === '') {
                            errors.username = "Please fill in your username";
                        }
                        if (values.password === '') {
                            errors.password = "Please fill in your password";
                        }
                        return errors;
                    }}
                        onSubmit={(values, {setSubmitting}) => {
                        this.setState({buttonText: "Logging In..."});
                        setTimeout(() => {
                            loginMutation({
                                variables: {
                                    username: values.username,
                                    password: values.password
                                }
                            });
                            setSubmitting(false);
                        }, 400);
                    }}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='username-field'>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username-input"
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}/>
                                    <label htmlFor="username-input">
                                        <i className='material-icons'>alternate_email</i>
                                    </label>
                                </div>
                                {touched.username && errors.username && <span id='username-error' className='error-message'>{errors.username}</span>}
                                <div className="password-field">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        id="password-input"/>
                                    <label htmlFor="password-input">
                                        <i
                                            className='material-icons'
                                            style={{
                                            cursor: "pointer"
                                        }}
                                            onClick={e => this.showPassword(e)}>visibility_off</i>
                                    </label>
                                </div>
                                {touched.password && errors.password && <span id='password-error' className='error-message'>{errors.password}</span>}
                                <button type="submit" className='btn' disabled={isSubmitting}>{this.state.buttonText}</button>
                            </form>
                        )}
                    </Formik>
}
                </Mutation>
            </div>
        );
    }
}

export default Login;