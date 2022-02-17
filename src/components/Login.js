import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(199, 216, 237);
`;

const LoginForm = styled.form`
	background: white;
	border: 1px solid #dedede;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin: 0 auto;
	min-width: 341px;
	min-height: 420px;
	padding: 30px 50px;
`;

const FormTitle = styled.h1`
	text-align: center;
	padding-bottom: 15px;
	margin-bottom: 0px;
`;

const FormInput = styled.input`
	margin-top: 5px;
	margin-bottom: 20px;
	border-radius: 5px;
	border-width: 1px;
	height: 35px;
`;

const SubmitButton = styled.input`
	margin-top: 10px;
	background-color: rgb(0, 65, 113);
	border: none;
	border-radius: 10px;
	color: white;
	height: 40px;
`;

const NavLink = styled.nav`
	font-size: small;
	padding-top: 20px;
`;

const ErrorMessage = styled.p`
	color: red;
`;

export function Login(props) {
	const navigate = useNavigate();
	const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
	const testUser = {
		username: 'htnUser',
		password: '0000',
	};
	const validateDetails = (details) => {
		if (
			details.username === testUser.username &&
			details.password === testUser.password
		) {
			props.setIsAuthenticated(true);
			navigate('/');
		} else {
			props.setIsAuthenticated(false);
			setIsErrorDisplayed(true);
		}
	};
	const handleLogin = (e) => {
		e.preventDefault();
		validateDetails(details);
		setDetails({ username: '', password: '' });
	};
	const [details, setDetails] = useState({ username: '', password: '' });
	return (
		<FormContainer>
			<LoginForm onSubmit={handleLogin}>
				<FormTitle>Login</FormTitle>
				{isErrorDisplayed ? (
					<ErrorMessage>Incorrect username or password.</ErrorMessage>
				) : null}
				<label>Username</label>
				<FormInput
					type='text'
					id='username'
					onChange={(e) => setDetails({ ...details, username: e.target.value })}
					value={details.username}
				/>
				<label>Password</label>
				<FormInput
					type='text'
					id='password'
					onChange={(e) => setDetails({ ...details, password: e.target.value })}
					value={details.password}
				/>
				<SubmitButton type='submit' value='Submit' />
				<NavLink>
					<Link to={'/'}>Continue as Guest</Link>
				</NavLink>
			</LoginForm>
		</FormContainer>
	);
}
