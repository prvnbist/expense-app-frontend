import React from 'react';
import {Link} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import {Formik} from 'formik';
import * as Yup from 'yup';

import CURRENT_USER from '../queries/CurrentUser';
import UPDATE_USER_MUTATION from '../queries/UpdateUser';

import Modal from './Modal';

const NavBar = (props) => {
    const [passwordVisibility,
        setPasswordVisibility] = React.useState(false);
    const [isFormUpdated,
        setIsFormUpdated] = React.useState(false);
    const [modal,
        showModal] = React.useState(false);
    const logOut = () => {
        localStorage.removeItem('access_token');
    }
    const showPassword = e => {
        if (!passwordVisibility) {
            e.target.innerText = 'visibility';
            document
                .getElementById('password-input')
                .type = "text";
            setPasswordVisibility(!passwordVisibility);
            return;
        }
        e.target.innerText = 'visibility_off';
        document
            .getElementById('password-input')
            .type = "password";
        setPasswordVisibility(!passwordVisibility);
    }
    const closeModal = value => showModal(value);
    const SignupSchema = Yup
        .object()
        .shape({
            name: Yup
                .string()
                .min(4, 'Name is too short!')
                .max(50, 'Name is too long!'),
            email: Yup
                .string()
                .email('Please enter a valid email!'),
            username: Yup
                .string()
                .min(4, 'Username is too short!')
                .max(50, 'Username is too long!')
                .matches(/^[a-zA-Z0-9-_]+$/, "Username must have _alpha_numerics"),
            password: Yup
                .string()
                .min(8, 'Password is too short!')
                .max(20, 'Password is too long!')
                .matches(/(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/, "Password must have atleast one lowercase letter, one uppercase letter, one digit" +
                        " and one special character.")
        });
    return (
        <nav className="container-fluid">
            {modal && (
                <Modal title={"Account"} closeModal={closeModal}>
                    <div className="account__modal">
                        <Query query={CURRENT_USER}>
                            {({client, loading, error, data: {
                                    me
                                }}) => {
                                if (loading) 
                                    return <div id='user-info-actions'>
                                        <span id="user-name">Loading...</span>
                                    </div>;
                                if (error) 
                                    return `Error! ${error.message}`;
                                return (
                                    <Mutation
                                        mutation={UPDATE_USER_MUTATION}
                                        refetchQueries={() => ['currentUser']}>
                                        {updateUser => (
                                            <Formik
                                                initialValues={{
                                                username: me.username,
                                                password: "",
                                                name: me.name,
                                                email: me.email
                                            }}
                                                validationSchema={SignupSchema}
                                                onSubmit={(values, {setSubmitting}) => {
                                                setTimeout(() => {
                                                    updateUser({
                                                        variables: {
                                                            username: values.username,
                                                            password: values.password,
                                                            name: values.name,
                                                            email: values.email
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
                                                        <Modal.Main>
                                                            <div
                                                                className='field'
                                                                style={{
                                                                background: isFormUpdated
                                                                    ? "#fff"
                                                                    : "rgb(248, 250, 255)"
                                                            }}>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter your name"
                                                                    id="name-input"
                                                                    onChange={e => isFormUpdated && handleChange(e)}
                                                                    onBlur={handleBlur}
                                                                    name="name"
                                                                    value={values.name}/>
                                                                <label htmlFor="name-input">
                                                                    <i className='material-icons'>account_circle</i>
                                                                </label>
                                                            </div>
                                                            {touched.name && errors.name && <span id='name-error' className='error-message'>{errors.name}</span>}
                                                            <div
                                                                className='field'
                                                                style={{
                                                                background: isFormUpdated
                                                                    ? "#fff"
                                                                    : "rgb(248, 250, 255)"
                                                            }}>
                                                                <input
                                                                    onChange={e => isFormUpdated && handleChange(e)}
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
                                                            <div
                                                                className="field"
                                                                style={{
                                                                background: isFormUpdated
                                                                    ? "#fff"
                                                                    : "rgb(248, 250, 255)"
                                                            }}>
                                                                <input
                                                                    onChange={e => isFormUpdated && handleChange(e)}
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
                                                            <div
                                                                className='field'
                                                                style={{
                                                                background: isFormUpdated
                                                                    ? "#fff"
                                                                    : "rgb(248, 250, 255)"
                                                            }}>
                                                                <input
                                                                    onChange={e => isFormUpdated && handleChange(e)}
                                                                    onBlur={handleBlur}
                                                                    value={values.password}
                                                                    type="password"
                                                                    name="password"
                                                                    placeholder="Enter your new password"
                                                                    id="password-input"/>
                                                                <label htmlFor="password-input">
                                                                    <i
                                                                        className='material-icons'
                                                                        style={{
                                                                        cursor: "pointer"
                                                                    }}
                                                                        onClick={e => showPassword(e)}>visibility_off</i>
                                                                </label>
                                                            </div>
                                                            {errors.password && <span id='password-error' className='error-message'>{errors.password}</span>}
                                                        </Modal.Main>
                                                        <Modal.Footer>
                                                            <button
                                                                type="button"
                                                                className='btn btn__primary btn__small'
                                                                style={{
                                                                display: isFormUpdated
                                                                    ? 'none'
                                                                    : "block"
                                                            }}
                                                                onClick={e => setIsFormUpdated(!isFormUpdated)}>Edit Profile</button>
                                                            <button
                                                                type="submit"
                                                                className='btn btn__success btn__small'
                                                                style={{
                                                                display: isFormUpdated
                                                                    ? 'block'
                                                                    : "none"
                                                            }}
                                                                onClick={e => setIsFormUpdated(!isFormUpdated)}
                                                                disabled={isSubmitting}>Save Profile</button>
                                                        </Modal.Footer>
                                                    </form>
                                                )}
                                            </Formik>
                                        )
}
                                    </Mutation>
                                )
                            }}
                        </Query>
                    </div>
                </Modal>
            )}
            <div className="container">
                <span id="logo">
                    <Link to="/"><img
                        src="https://res.cloudinary.com/prvnbist/image/upload/v1561215489/Expense%20App/expense-logo.svg"
                        alt="Expense Manager"/>
                        Expense Manager</Link>
                </span>
                {props.show && <Query query={CURRENT_USER}>
                    {({client, loading, error, data: {
                            me
                        }}) => {
                        if (loading) 
                            return <div id='user-info-actions'>
                                <span id="user-name">Loading...</span>
                            </div>;
                        if (error) 
                            return `Error! ${error.message}`;
                        return <div id='user-info-actions'>
                            <div className="user__image" onClick={() => showModal(!modal)}>
                                <i className="material-icons">account_circle</i>
                            </div>
                            <Link to="/">
                                <button
                                    className="btn btn__overlay__dark"
                                    onClick={() => {
                                    logOut();
                                    client.resetStore()
                                }}>Logout</button>
                            </Link>
                        </div>
                    }}
                </Query>
}
            </div>
        </nav>
    )
}

export default NavBar;