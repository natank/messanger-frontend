import { Button, Container } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import { useState } from 'react';
import SearchField from './SearchField';
import HeaderContainer from './HeaderContainer';
export default function ChatFindHeader({ setMode, prevMode }) {
	let useStyles = makeStyles(theme => ({
		headerContainer: {
			display: 'flex',
			alignItems: 'center',
			height: '5rem',
		},
	}));
	let classes = useStyles();
	let [filter, setFilter] = useState('');
	return (
		<Container disableGutters className={classes.headerContainer}>
			<Button>
				<ArrowBack onClick={() => setMode(prevMode)} />
			</Button>

			<SearchField handleChange={handleChange} filter={filter} />
		</Container>
	);

	function handleChange(event) {
		setFilter(event.target.value);
	}
}
