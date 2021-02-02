import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
export default function SearchField({ handleChange, filter }) {
	let useStyles = makeStyles({
		root: { marginRight: '1rem' },
	});
	let classes = useStyles();
	return (
		<TextField
			className={classes.root}
			fullWidth={true}
			id='filter'
			label='search...'
			value={filter}
			onChange={handleChange}
		/>
	);
}
