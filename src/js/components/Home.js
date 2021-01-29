import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../Context/main-context';
import { checkAccessToRoute } from '../Utils/utils';

var useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '80vh',
	},
	title: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
	},
}));

export default function Home() {
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	var classes = useStyles();

	return (
		<Container className={classes.root}>
			<Grid
				container
				direction='column'
				alignItems='center'
				spacing={3}
				id='contentContainer'>
				<Grid item>
					<Typography
						variant='h2'
						style={{ textAlign: 'center' }}
						className={classes.title}>
						Welcome to MovieNG
					</Typography>
				</Grid>
				<Grid item>
					<Typography style={{ textAlign: 'center' }}>
						View, Edit, Add or Delete Movies and Members
					</Typography>
				</Grid>
				<Grid item>
					<Typography style={{ textAlign: 'center' }}>
						Subscribe members to watch their favorite movies
					</Typography>
				</Grid>
				<Grid item container justify='center' spacing={3}>
					<Grid item>
						<Button
							variant='contained'
							component={Link}
							to='/movies'
							disabled={
								authUser == null || !checkAccessToRoute('/movies', authUser)
							}
							color='primary'>
							Manage Movies
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							component={Link}
							to='/movies'
							disabled={
								authUser == null ||
								!checkAccessToRoute('/subscriptions', authUser)
							}>
							Manage Subscriptions
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
