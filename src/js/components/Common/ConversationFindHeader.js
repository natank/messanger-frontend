import { Button, Container } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, Fragment } from 'react';
import { useState } from 'react';
import SearchField from './SearchField';

let searchTimeout; // Timeout used for debouncing the search input
export default function ConversationFindHeader({
	setMode,
	prevMode,
	onFilterChanged,
}) {
	let useStyles = makeStyles(theme => ({
		headerContainer: {
			display: 'flex',
			alignItems: 'center',
			height: '5rem',
		},
	}));
	let classes = useStyles();
	let [filter, setFilter] = useState('');

	useEffect(() => {
		// debounce the search input
		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			onFilterChanged(filter);
		}, 50);
		return function cleanup() {
			onFilterChanged(null);
		};
	}, [filter]);

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
