import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Grid, Button } from '@material-ui/core';

import { MoviesManagementContext } from '../../Context/movies-management-context';
import { useFormInput } from '../../Utils/customHooks';
export default function MovieForm({ movieDetails, actionText, onSubmitCb }) {
	var { moviesManagementUrl } = useContext(MoviesManagementContext);
	var { id, name, genres, image, premiered } = movieDetails || {};

	name = useFormInput(name || '');
	genres = useFormInput(genres ? genres.toString() : '');
	image = useFormInput(image || '');
	premiered = useFormInput(premiered || '');

	return (
		<form onSubmit={onSubmit} id='movieForm'>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField fullWidth required label='Name' {...name} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField fullWidth required label='Generes' {...genres} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField fullWidth required label='Image URL' {...image} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField fullWidth required label='Premiered' {...premiered} />
				</Grid>
				<Grid item container>
					<Grid item container spacing={3}>
						<Grid item>
							<Button variant='contained' color='primary' type='submit'>
								{actionText}
							</Button>
						</Grid>
						<Grid item>
							<Button component={Link} to={`${moviesManagementUrl}`}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);

	function onSubmit(event) {
		event.preventDefault();
		var inputs = { name, genres, image, premiered };

		var updatedDetails = id ? { id: id } : {};
		for (const [key, input] of Object.entries(inputs)) {
			updatedDetails[key] = input.value;
			input.onReset();
		}

		onSubmitCb(updatedDetails);
	}
}
