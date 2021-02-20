import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../Model/Auth-Model';
import { MainContext } from '../../Context/main-context';
import useStyles from './styles';

import {
	Container,
	Grid,
	TextField,
	Typography,
	Button,
} from '@material-ui/core';
import AuthHeader from './AuthHeader';
export default function Login(props) {
	const classes = useStyles();
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;

	return (
		<Container component='main' maxWidth='xs'>
			<Grid container className={classes.contentContainer}>
				<Grid item container>
					<AuthHeader />
					<div className={classes.paper}>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='username'
								label='User Name'
								autoFocus
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='password'
								label='Password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								autoComplete='current-password'
							/>
							{errorMessage ? <p>{errorMessage}</p> : null}
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.submit}>
								Sign In
							</Button>
							<Typography component='p' variant='body1'>
								New User ? :<Link to='/createAccount'>Create Account</Link>
							</Typography>
						</form>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			var user = await loginUser({ username, password });

			// Dispatch the user
			dispatch({
				type: 'LOGIN_USER',
				payload: user,
			});
		} catch (err) {
			setErrorMessage(err.errorMessage[0].msg);
		}
	}
}
