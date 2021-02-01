import { Button, Container } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment } from 'react';
import { useState } from 'react';
import SearchField from './SearchField';
import HeaderContainer from './HeaderContainer'
export default function ChatFindHeader({ setMode, prevMode }) {
	let useStyles = makeStyles(theme => ({
		headerContainer: {
			display: 'flex',
			alignItems: 'center',
			backgroundColor:'red'
		},
	}));
	let classes = useStyles();
	let [filter, setFilter] = useState('');
	return (
		<HeaderContainer className={classes.headerContainer}>
			<Button>
				<ArrowBack onClick={() => setMode(prevMode)} />
			</Button>

			<SearchField handleChange={handleChange} filter={filter}/>
		</HeaderContainer>
	);

	function handleChange(event) {
		setFilter(event.target.value);
	}
}
