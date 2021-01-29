import React, { useContext } from 'react'
import { MainContext } from "../../Context/main-context"
import MovieDetails from './MovieDetails'

export default function MovieUrlWrapper({ match }) {
    var { store } = useContext(MainContext);

    var [state, dispatch] = store;
    var { movies } = state;

    var movie = movies.find(movie => movie.id == match.params.id)

    return (
        <MovieDetails {...{ movie, match }} />
    )
}