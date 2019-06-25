import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {Formik} from 'formik';
import * as Yup from 'yup';

import NavBar from '../components/NavBar';

import SIGNUP_MUTATION from '../queries/SignUpMutation';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            buttonText: "Sign Up"
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
    submitForm = ({signup}) => {
        localStorage.clear();
        localStorage.setItem('access_token', signup);
        this
            .props
            .history
            .push('/dashboard');
    }
    render() {
        const SignupSchema = Yup
            .object()
            .shape({
                name: Yup
                    .string()
                    .min(4, 'Name is too short!')
                    .max(50, 'Name is too long!')
                    .required('Name is required!'),
                email: Yup
                    .string()
                    .email('Please enter a valid email!')
                    .required('Email is required!'),
                username: Yup
                    .string()
                    .min(4, 'Username is too short!')
                    .max(50, 'Username is too long!')
                    .matches(/^[a-zA-Z0-9-_]+$/, "Username must have _alpha_numerics")
                    .required("Username is required!"),
                password: Yup
                    .string()
                    .min(8, 'Password is too short!')
                    .max(20, 'Password is too long!')
                    .matches(/(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/, "Password must have atleast one lowercase letter, one uppercase letter, one digit" +
                            " and one special character.")
                    .required("Password is required!")
            });
        return (
            <div className="signup">
            <h2 className="page-heading">Register to start managing your expenses.</h2>
                <Mutation
                    mutation={SIGNUP_MUTATION}
                    onCompleted={data => this.submitForm(data)}>
                    {signUpMutation => <Formik
                        initialValues={{
                        username: '',
                        password: '',
                        name: '',
                        email: '',
                        gender: 'M'
                    }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, {setSubmitting}) => {
                        this.setState({buttonText: "Signing Up..."});
                        setTimeout(() => {
                            signUpMutation({
                                variables: {
                                    username: values.username,
                                    password: values.password,
                                    name: values.name,
                                    email: values.email,
                                    gender: values.gender
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
                                <div className='field'>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        id="name-input"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="name"
                                        value={values.name}/>
                                    <label htmlFor="name-input">
                                        <i className='material-icons'>account_circle</i>
                                    </label>
                                </div>
                                {touched.name && errors.name && <span id='name-error' className='error-message'>{errors.name}</span>}
                                <div className='field'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        id="email-input"/>
                                    <label htmlFor="email-input">
                                        <i className='material-icons'>email</i>
                                    </label>
                                </div>
                                {touched.email && errors.email && <span id='email-error' className='error-message'>{errors.email}</span>}
                                <div className="field">
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        id="username-input"/>
                                    <label htmlFor="username-input">
                                        <i className='material-icons'>alternate_email</i>
                                    </label>
                                </div>
                                {touched.username && errors.username && <span id='username-error' className='error-message'>{errors.username}</span>}
                                <div className='field'>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
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
                                <div className="field select-field">
                                    <select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="select-dropdown"
                                        value={values.gender}
                                        name="gender">
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className='btn'
                                    onClick={e => e.target.innerText = "Signing Up..."}disabled={isSubmitting}>{this.state.buttonText}</button>
                            </form>
                        )}
                    </Formik>
}
                </Mutation>
            </div>
        )
    }
}