import React, { useEffect, useContext, useState } from 'react';
import {
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { today } from '../../Utils/utils';
import { MainContext } from '../../Context/main-context';

var useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
}));

export default function SubscriptionForm({
	onFormCancel,
	onSubscription,
	memberDetails,
}) {
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { members, movies } = state;
	var classes = useStyles();

	const memberId = memberDetails.id;
	memberDetails.movies = memberDetails.movies || [];

	var moviesNotWatched = movies.filter(isMovieNotWatched);

	function isMovieNotWatched(currMovie) {
		return !memberDetails.movies.some(function compareMovieIds(
			currMemberMovie
		) {
			var result = currMovie.id == currMemberMovie.movieId;
			return result;
		});
	}

	var [selectedMovieId, setSelectedMovieId] = useState(0);
	var [selectedMovieDate, setSelectedMovieDate] = useState(today());

	useEffect(() => {
		// check that selected movie id is in movies not watched
		var isSelectedMovieWatched = !isMovieNotWatched({ id: selectedMovieId });
		if (isSelectedMovieWatched) {
			setSelectedMovieId(0);
		}
	});

	return (
		<form onSubmit={onSubmit}>
			<Typography variant='h6' gutterBottom>
				Add a new movie
			</Typography>
			<Grid container spacing={2}>
				<Grid item container xs={12} spacing={2} alignItems='flex-end'>
					<Grid item>
						<FormControl className={classes.FormControl}>
							<InputLabel id='movies-select-label'>Select Movie</InputLabel>
							{isMovieNotWatched({ id: selectedMovieId }) ? (
								<Select
									labelId='movies-select-label'
									id='movies-select'
									value={selectedMovieId}
									className={classes.selectEmpty}
									onChange={function (event) {
										setSelectedMovieId(event.target.value);
									}}>
									<MenuItem value={0}>
										<em>None</em>
									</MenuItem>

									{MovieOptions()}
								</Select>
							) : null}
						</FormControl>
					</Grid>

					<Grid item>
						<TextField
							id='date'
							label=''
							type='date'
							name='watch'
							value={selectedMovieDate}
							onChange={function (event) {
								setSelectedMovieDate(event.target.value);
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>

				<Grid item container spacing={2}>
					<Grid item>
						<input
							type='submit'
							value='Subscribe'
							disabled={moviesNotWatched.length == 0}
						/>
					</Grid>
					<Grid item>
						<input type='button' value='cancel' onClick={onFormCancel} />
					</Grid>
				</Grid>
			</Grid>
		</form>
	);

	function MovieOptions(props) {
		var movies = moviesNotWatched.map(movie => {
			return (
				<MenuItem key={movie.id} value={movie.id + ''}>
					{movie.name}
				</MenuItem>
			);
		});
		return movies;
	}

	function onSubmit(event) {
		event.preventDefault();
		if (selectedMovieId == undefined) return;
		let selectedMovie = movies.find(movie => movie.id == selectedMovieId);
		var subscriptionDetails = {
			movie: {
				name: selectedMovie.name,
				_id: selectedMovie.id,
			},
			date: selectedMovieDate,
		};
		onSubscription(subscriptionDetails);
	}
}
