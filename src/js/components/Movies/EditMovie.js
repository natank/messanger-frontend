import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as Movie from '../../Model/movie-model';
import MovieForm from './MovieForm';
import { compareItemId } from '../../Utils/utils';
import { MoviesManagementContext } from '../../Context/movies-management-context';

var useStyles = makeStyles(theme => ({
	title: {
		marginBottom: '1em',
	},
}));

export default function EditMovie({ match, navIndex, setNavIndex }) {
	const movieId = match.params.id;
	let [editedMovie, setEditedMovie] = useState(null);

	useEffect(() => {
		if (!editedMovie)
			Movie.findMovie(movieId)
				.then(movie => setEditedMovie(movie))
				.catch(error => console.log(error));
	});

	var { moviesManagementUrl } = useContext(MoviesManagementContext);
	var history = useHistory();
	var classes = useStyles();

	return (
		<Grid item>
			{editedMovie ? (
				<Box>
					<Typography variant='h4' className={classes.title}>
						Edit Movie: {`${editedMovie.name}`}
					</Typography>
					<MovieForm
						movieDetails={editedMovie}
						actionText='Update'
						onSubmitCb={onUpdateMovie}
					/>
				</Box>
			) : (
				<div>Movie not found</div>
			)}
		</Grid>
	);

	async function onUpdateMovie(movieDetails) {
		var details = { ...movieDetails };
		try {
			await Movie.updateMovie(movieId, details);
		} catch (error) {
			console.log(`error occured: ${error}`);
		}
		history.push(moviesManagementUrl);
	}
}
