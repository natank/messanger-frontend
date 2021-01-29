import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../Context/main-context';
import { deleteMovie } from '../../Model/movie-model';
import MovieSubscriptions from './MovieSubscriptions';
import { checkAccessToRoute } from '../../Utils/utils';

const useStyles = makeStyles({
	movieCard: {
		minWidth: 300,
	},
	movieTitle: {
		height: '60px',
	},
});

export default function MovieDetails({
	movie,
	match,
	deleteMovie: removeMovie,
}) {
	var classes = useStyles();
	if (!movie) return null;

	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser, members } = state;

	var editMovieRoute = `${match.url}/edit/${movie.id}`;
	var deleteMovieRoute = `${match.url}/delete/${movie.id}`;
	var isUserAllowedToDelete = checkAccessToRoute(deleteMovieRoute, authUser);
	var isUserAllowedToEdit = checkAccessToRoute(editMovieRoute, authUser);
	try {
		var movieSubscriptions = getMovieSubscriptions();
	} catch (error) {
		console.log(movie);
	}

	return (
		<Card variant='outlined'>
			<Grid container>
				<Grid item xs={6}>
					<CardMedia component='img' image={`${movie.image}`} />
				</Grid>
				<Grid item xs={6}>
					<CardContent>
						<Typography
							gutterBottom
							variant='h5'
							component='h2'
							gutterBottom
							className={classes.movieTitle}>
							{`${movie.name}, ${new Date(movie.premiered).getFullYear()} `}
						</Typography>
						<Typography gutterBottom>{`Generes: ${movie.genres.map(
							genere => genere
						)}`}</Typography>
						{movieSubscriptions.length > 0 ? (
							<React.Fragment>
								<Typography variant='h6'>Subscriptions</Typography>
								<MovieSubscriptions movie={movie} />
							</React.Fragment>
						) : (
							<Typography variant='h6'>No Subscriptions</Typography>
						)}

						<CardActions>
							{isUserAllowedToEdit ? (
								<Button
									variant='contained'
									color='primary'
									component={Link}
									to={`${match.url}/edit/${movie.id}`}>
									Edit
								</Button>
							) : null}
							{isUserAllowedToDelete ? (
								<Button onClick={onDeleteMovie}>Delete</Button>
							) : null}
						</CardActions>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);

	async function onDeleteMovie(event) {
		event.preventDefault();
		var movieId = movie.id;
		try {
			await deleteMovie(movie.id);
			removeMovie(movie.id);
		} catch (err) {
			console.log(err);
		}
		dispatch({
			type: 'REMOVE_MOVIE',
			payload: { movieId },
		});
	}

	function getMovieSubscriptions() {
		// loop through all the members. Filter in members who are subscribed to movie
		return members
			? members.reduce(function createSubscription(acc, member) {
					var subscription =
						member.movies &&
						member.movies.find(currMovie => currMovie.movieId == movie.id);
					if (subscription) {
						subscription = {
							member: {
								id: member.id,
								name: member.name,
							},
							date: subscription.date,
						};
						return [...acc, subscription];
					}
					return acc;
			  }, [])
			: null;
	}
}
