import React, { useEffect, useContext, useState } from 'react';
import { makeStyles, Card, Typography } from '@material-ui/core';

export default function FeedMessage({
	color = '#fff',
	text = 'hello',
	author,
}) {
	let maxWidth = `${getRandom(30, 50)}%`;
	let useStyles = makeStyles({
		root: {
			backgroundColor: color,
			color: '#000',
			maxWidth,
			padding: '1rem',
			marginBottom: '.5rem',
		},
		headline: {
			color: 'blue',
			display: 'block',
			marginBottom: '1rem',
		},
		body: {
			color: '#000',
		},
	});
	let classes = useStyles();

	return (
		<Card className={classes.root}>
			<Typography className={classes.headline} variant='body1'>
				{author.username}
			</Typography>
			<Typography className={classes.body} variant='body2'>
				{text}
			</Typography>
		</Card>
	);
}

function getRandom(min, max) {
	return Math.random() * (max - min + 1) + min;
}
