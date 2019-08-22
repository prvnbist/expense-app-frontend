import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'

import LOGIN_MUTATION from '../queries/LoginMutation'

const Login = props => {
	const [show, toggleShow] = React.useState(false)
	const [authError, setAuthError] = React.useState(null)
	const [loginUser, { loading: mutationLoading }] = useMutation(
		LOGIN_MUTATION,
		{
			onError: err => setAuthError(err.message.split(':')[1].trim()),
			onCompleted: ({ login }) => {
				localStorage.clear()
				localStorage.setItem('access_token', login)
				props.history.push('/dashboard')
			},
		}
	)

	const showPassword = e => {
		e.target.innerText = show ? 'visibility_off' : 'visibility'
		document.getElementById('password-input').type = show
			? 'password'
			: 'text'
		toggleShow(!show)
	}
	return (
		<div className="login">
			<h2 className="page-heading">Login to view your expenses.</h2>
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}
				validate={values => {
					setAuthError(null)
					let errors = {}
					if (values.username === '') {
						errors.username = 'Please fill in your username'
					}
					if (values.password === '') {
						errors.password = 'Please fill in your password'
					}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						loginUser({
							variables: {
								username: values.username,
								password: values.password,
							},
						})
						setSubmitting(false)
					}, 400)
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						{authError && (
							<span id="username-error" className="error-message">
								Incorrect username or password!
							</span>
						)}
						<div className="field">
							<input
								type="text"
								name="username"
								id="username-input"
								placeholder="Enter your username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
							/>
							<label htmlFor="username-input">
								<i className="material-icons">
									alternate_email
								</i>
							</label>
						</div>
						{touched.username && errors.username && (
							<span id="username-error" className="error-message">
								{errors.username}
							</span>
						)}
						<div className="field">
							<input
								type="password"
								name="password"
								placeholder="Enter your password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								id="password-input"
							/>
							<label htmlFor="password-input">
								<i
									className="material-icons"
									style={{
										cursor: 'pointer',
									}}
									onClick={e => showPassword(e)}
								>
									visibility_off
								</i>
							</label>
						</div>
						{touched.password && errors.password && (
							<span id="password-error" className="error-message">
								{errors.password}
							</span>
						)}
						<button
							type="submit"
							className="btn btn__primary"
							disabled={isSubmitting}
						>
							{mutationLoading ? 'Logging in...' : 'Login'}
						</button>
					</form>
				)}
			</Formik>
		</div>
	)
}

export default Login
