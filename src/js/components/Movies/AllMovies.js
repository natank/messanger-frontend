import React, { useContext, useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { resetMovies } from '../../Model/movie-model';
import MovieDetails from './MovieDetails';
import { MainContext } from '../../Context/main-context';
import MoviesNav from './MoviesNav';
import FindMovie from './FindMovie';
import cinema from '../../API/cinema';

const useStyles = makeStyles({
	navContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	movieCardContainer: {
		width: '20%',
	},
});

export default function AllMovies(props) {
	let { match, navIndex, setNavIndex } = props;
	let { store, token } = useContext(MainContext);
	let theme = useTheme();
	let [state, dispatch] = store;

	let [filterString, setFilterString] = useState('');
	let [movies, setMovies] = useState([]);
	let user = state.authUser;

	if (filterString.length > 2) {
		movies = movies.filter(function (movie) {
			let val = movie.name.toLowerCase().includes(filterString.toLowerCase());
			return val;
		});
	}
	var classes = useStyles();

	useEffect(() => {
		if (movies.length < 1) setMovies(state.movies);
	});

	return (
		<Grid
			item
			container
			direction='column'
			spacing={6}
			className={classes.mainContainer}
			id='allMoviesContainer'>
			<Grid
				item
				container
				alignItems='center'
				justify='center'
				id='movieMenuContainer'
				direction='column'>
				<Grid item></Grid>
				<MoviesNav
					match={match}
					navIndex={navIndex}
					setNavIndex={setNavIndex}
				/>
			</Grid>
			<Grid item container justify='center'>
				<FindMovie {...{ changeFilter }} />
				{user.admin ? (
					<Button
						variant='contained'
						onClick={onReset}
						disabled
						style={{
							color: theme.palette.warning.contrastText,
							backgroundColor: theme.palette.warning.light,
						}}>
						Reset
					</Button>
				) : null}
			</Grid>
			<Grid
				item
				container
				id='movieGridContainer'
				component='ul'
				spacing={2}
				justify='center'>
				{movies
					? movies.map(function renderMovie(movie) {
							return (
								<Grid
									item
									xs={12}
									md={6}
									xl={3}
									key={movie.id}
									className={classes.movieCardContainer}>
									<MovieDetails {...{ movie, match, deleteMovie }} />
								</Grid>
							);
					  })
					: null}
			</Grid>
		</Grid>
	);

	function changeFilter(newFilter) {
		setFilterString(newFilter);
	}
	function onReset() {
		resetMovies();
	}
	function deleteMovie(movieId) {
		let newList = movies.filter(movie => movie.id !== movieId);
		setMovies(newList);
	}
}
