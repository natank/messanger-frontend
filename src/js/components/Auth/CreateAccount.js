import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { createAccount } from '../../Model/Auth-Model';

import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
	FormControl,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import AuthHeader from './AuthHeader';
import { makeStyles } from '@material-ui/core';

let useStyles = makeStyles({
	gender: {
		flexDirection: 'row',
	},
});

export default function CreateAccount(props) {
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [memberStatus, setMemberStatus] = useState('');
	const [gender, setGender] = useState('female');
	var history = useHistory();
	return (
		<div>
			<Container component='main' maxWidth='xs'>
				<Grid container className={classes.contentContainer}>
					<Grid item container>
						<AuthHeader />
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
								type='password'
								value={password}
								label='Password'
								onChange={e => setPassword(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='passwordConfirmation'
								type='password'
								value={passwordConfirmation}
								label='Confirm Password'
								onChange={e => setPasswordConfirmation(e.target.value)}
							/>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='status'
								value={memberStatus}
								label='Your status (Work, At School...)'
								onChange={e => setMemberStatus(e.target.value)}
							/>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>Gender</FormLabel>
								<RadioGroup
									aria-label='gender'
									name='gender1'
									value={gender}
									onChange={event => setGender(event.target.value)}
									className={classes.gender}>
									<FormControlLabel
										value='female'
										control={<Radio />}
										label='Female'
									/>
									<FormControlLabel
										value='male'
										control={<Radio />}
										label='Male'
									/>
								</RadioGroup>
							</FormControl>

							<p>{errorMessage}</p>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.submit}>
								Create Account
							</Button>
							<Typography component='p' variant='body1'>
								Have Account ? :<Link to='/login'>Login</Link>
							</Typography>
						</form>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await createAccount({ username, password, passwordConfirmation, gender });
			history.push('/');
		} catch (err) {
			setErrorMessage(err);
		}
	}
}
