import { Button, Container, TextField } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import { useState } from 'react';

export default function ChatFindHeader({ setMode }) {
	let useStyles = makeStyles(theme => ({
		headerContainer: {
			display: 'flex',
			alignItems: 'center',
		},
	}));
	let classes = useStyles();
	let [filter, setFilter] = useState('');
	return (
		<Container className={classes.headerContainer}>
			<Button>
				<ArrowBack onClick={() => setMode('chats')} />
			</Button>
			<TextField
				fullWidth='true'
				id='filter'
				label='search...'
				value={filter}
				onChange={handleChange}
			/>
		</Container>
	);

	function handleChange(event) {
		setFilter(event.target.value);
	}
}
