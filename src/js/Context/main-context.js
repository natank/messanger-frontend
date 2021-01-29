import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getUsersPermissions } from '../Model/user-permissions-model';
import { getUsers } from '../Model/user-model';
import { getMovies, resetMovies } from '../Model/movie-model';
import { getMembers } from '../Model/member-model';

import {
	usersReducer,
	usersPermissionsReducer,
	moviesReducer,
	membersReducer,
	authUserReducer,
} from '../Reducers/reducers';

export var MainContext = createContext();

export function MainContextProvider(props) {
	try {
		var sessionUser = JSON.parse(sessionStorage.getItem('user'));
	} catch (err) {
		sessionUser = undefined;
	}

	const initialState = {
		users: [],
		usersPermissions: [],
		movies: [],
		members: [],
		authUser: sessionUser || null,
	};
	const rootReducer = combineReducers({
		users: usersReducer,
		usersPermissions: usersPermissionsReducer,
		movies: moviesReducer,
		members: membersReducer,
		authUser: authUserReducer,
	});

	const [state, dispatch] = useReducer(rootReducer, initialState);
	const store = useMemo(() => [state, dispatch], [state]);

	var { authUser } = state;

	var urls = {
		membersManagementUrl: `/subscriptions`,
		moviesManagementUrl: `/movies`,
		usersManagementUrl: `/usersManagement`,
	};
	var history = useHistory();
	useEffect(() => {
		if (authUser != null) loadData();
		else history.push('/');
	}, [authUser]);

	var token = localStorage.getItem('token');
	return (
		<MainContext.Provider value={{ store, token, ...urls }}>
			{props.children}
		</MainContext.Provider>
	);

	async function loadData() {
		var users = await getUsers();
		var usersPermissions = await getUsersPermissions();
		var movies = await getMovies();
		var members = await getMembers();

		dispatch({
			type: 'LOAD',
			payload: { users, usersPermissions, movies, members },
		});

		return;
	}
}

const combineReducers = slices => (state, action) =>
	Object.keys(slices).reduce(
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);
