import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { useTheme } from '@material-ui/core/styles';
import { MainContext } from '../../Context/main-context';

export default function FeedNewMessage({ createMessage }) {
	const theme = useTheme();
	const [message, setMessage] = useState('');
	const useStyles = makeStyles({
		root: {
			backgroundColor: theme.palette.common.white,
			border: 'none',
			borderRadius: '40px',
		},
		noOutline: {
			border: 'none',
		},
		form: {
			display: 'flex',
			backgroundColor: theme.palette.grey[400],
			padding: '.5rem',
		},
		submit: {
			display: message.length > 0 ? 'block' : 'none',
		},
	});
	const classes = useStyles();

	function onSubmitMessage(event) {
		event.preventDefault();
		createMessage({ message });
		setMessage('');
	}

	return (
		<form onSubmit={onSubmitMessage} className={classes.form}>
			<IconButton className={classes.submit} type='submit' aria-label='delete'>
				<SubdirectoryArrowLeftIcon />
			</IconButton>
			<TextField
				className={classes.root}
				InputProps={{ classes: { notchedOutline: classes.noOutline } }}
				id='message'
				fullWidth={true}
				variant='outlined'
				placeholder='Type Message'
				value={message}
				onChange={event => setMessage(event.target.value)}
			/>
		</form>
	);
}
