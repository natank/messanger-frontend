import { useContext } from 'react';

import Model from './Model';
import initMovies from '../API/tvmaze';
import { getToken } from '../Utils/utils';
import cinema from '../API/cinema';

var movieModel = new Model({ collectionName: 'movies', docName: 'movie' });

export async function findMovie(movieId) {
	let token = getToken();
	try {
		var result = await cinema({
			url: `/movies/${movieId}`,
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data.movie;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getMovies() {
	let token = getToken();
	try {
		var result = await cinema({
			url: `/movies`,
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data.movies;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createMovie(newMovie) {
	let token = getToken();
	try {
		var result = await cinema({
			url: `/movies`,
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: newMovie,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteMovie(movieId) {
	let token = getToken();
	try {
		var result = await cinema({
			url: `/movies/delete/${movieId}`,
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		throw error;
	}
}

export async function updateMovie(movieId, movieDetails) {
	let token = getToken();
	try {
		var result = await cinema({
			url: `/movies/${movieId}`,
			method: 'put',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: movieDetails,
		});
		return result.data.movie;
	} catch (error) {
		throw error;
	}
}

export async function resetMovies() {
	var movies = initMovies.slice(0, 20).map(movie => {
		return {
			generes: movie.genres,
			image: movie.image.medium,
			name: movie.name,
			premiered: movie.premiered,
		};
	});
	movieModel.createDocs(movies);
}
