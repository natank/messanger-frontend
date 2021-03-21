import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default function SearchField({ value, setValue, setMode }) {
	let useStyles = makeStyles({
		root: { marginRight: '1rem' },
	});
	let classes = useStyles();

	function handleChange(event) {
		event.preventDefault();
		setValue(event.target.value);
	}
	return (
		<TextField
			className={classes.root}
			fullWidth={true}
			id='filter'
			label='search...'
			value={value}
			onChange={handleChange}
		/>
	);
}
