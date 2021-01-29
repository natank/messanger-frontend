import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

export default function AuthHeader() {
	const classes = useStyles();
	return (
		<Grid container direction='column' alignItems='center'>
			<Button variant='contained' color='primary' component={Link} to='/'>
				<Typography component='h2' variant='h2' align='center'>
					MovieNG
				</Typography>
			</Button>
		</Grid>
	);
}
