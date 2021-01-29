import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MainContext } from '../../Context/main-context';

const useStyles = makeStyles(theme => ({
	memberMoviesWatched: {
		paddingInlineStart: 0,
	},
}));
export default function MemberSubscriptions({ member }) {
	var classes = useStyles();
	const { store, moviesManagementUrl } = useContext(MainContext);
	var [state, dispatch] = store;
	var subscribedMovies = member.subscriptions;
	var allMovies = [...state.movies];

	if (subscribedMovies) return <SubscribedMovies />;
	else return <div>No subscriptions yet</div>;

	function SubscribedMovies(props) {
		return (
			<List component='ul' className={classes.memberMoviesWatched}>
				{subscribedMovies.map(subscribedMovie => {
					var movie = getMovieById(subscribedMovie.movie._id);
					if (!movie) return null;
					return (
						<ListItem disableGutters key={movie.id}>
							<Typography
								component={Link}
								to={`${moviesManagementUrl}/${movie.id}`}>
								{`${movie.name}`}
							</Typography>
							<Typography style={{ marginLeft: '.2rem', marginRight: '.6rem' }}>
								,
							</Typography>
							<Typography variant='body1'>
								{` ${subscribedMovie.date}`}
							</Typography>
						</ListItem>
					);
				})}
			</List>
		);
	}
	function getMovieById(paramId) {
		var movie = allMovies.find(function compareId(movie) {
			var result = movie.id == paramId;
			return result;
		});
		return movie;
	}
}
