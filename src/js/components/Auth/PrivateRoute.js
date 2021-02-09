import React, { useContext } from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';

export default function PrivateRoute({ component: Component, ...rest }) {
	let { store } = useContext(MainContext);
	let [state] = store;
	let { authUser } = state;
	let match = useRouteMatch();
	let history = useHistory();
	return (
		<Route
			{...rest}
			render={props => {
				let result = checkAccessToRoute(`${match.url}`, authUser);
				// result = true;
				return result ? (
					<Component {...props} {...rest} />
				) : (
					history.push('/login')
				);
			}}
		/>
	);
}

export function checkAccessToRoute(route, user) {
	if (!user) return false;
	return true;
}
