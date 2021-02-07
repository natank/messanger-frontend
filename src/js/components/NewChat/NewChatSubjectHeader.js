import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

let useStyles = makeStyles({
	root: {
		backgroundColor: 'green',
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		padding: '1rem 0',
		width: '100%',
	},
	inner: {
		display: 'flex',
		flexGrow: '3',
	},
	search: {
		flexGrow: '1',
	},
});

export default function NewChatSubjectHeader({ setMode }) {
	let classes = useStyles();
	let history = useHistory();
	function handleChange(event, newValue) {}

	return (
		<Container className={classes.root} disableGutters={true}>
			<Button color='inherit' onClick={() => history.push('/')}>
				<ArrowBack />
			</Button>
			<div>
				<Typography variant='h6'>New Group</Typography>
				<Typography variant='body1'>Add subject</Typography>
			</div>
		</Container>
	);
}
