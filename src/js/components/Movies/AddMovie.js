import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoviesManagementContext } from '../../Context/movies-management-context';

import MoviesNav from './MoviesNav';
import MovieForm from './MovieForm';
import { createMovie } from '../../Model/movie-model';

var useStyles = makeStyles(theme => ({
	addMovie: {
		minWidth: 300,
	},
}));

export default function AddMovie(props) {
	const { moviesManagementUrl } = useContext(MoviesManagementContext);
	let { navIndex, setNavIndex } = props;
	let classes = useStyles();
	var history = useHistory();
	return (
		<Grid
			item
			container
			direction='column'
			xs={6}
			spacing={6}
			className={classes.addMovie}
			id='addMovie'>
			<Grid item xs={12} container alignItems='center' justify='center'>
				<MoviesNav navIndex={navIndex} setNavIndex={setNavIndex} />
			</Grid>
			<Grid item>
				<Typography variant='h4' align='center'>
					Add New Movie
				</Typography>

				<MovieForm actionText='Create' onSubmitCb={onCreateMovie} />
			</Grid>
		</Grid>
	);

	async function onCreateMovie(movieDetails) {
		var details = { ...movieDetails };
		details.generes = details.genres.split(',');
		try {
			await createMovie(details);
		} catch (error) {
			console.log(`error occured: ${error}`);
		}
		history.push(moviesManagementUrl);
	}
}
