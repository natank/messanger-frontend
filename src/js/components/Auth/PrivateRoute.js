import React, { useContext } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import { checkAccessToRoute } from '../../Utils/utils';
export default function PrivateRoute({ match, component: Component, ...rest }) {
	var { store } = useContext(MainContext);
	var [state] = store;
	var { authUser } = state;
	var match = useRouteMatch();

	return (
		<Route
			{...rest}
			render={props => {
				var result = checkAccessToRoute(`${match.url}`, authUser);
				return result ? (
					<Component {...props} {...rest} />
				) : (
					<Redirect to='/' />
				);
			}}
		/>
	);
}
