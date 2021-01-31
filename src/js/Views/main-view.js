import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../Context/main-context';
import { Container, Grid } from '@material-ui/core';

import Footer from '../components/Footer';

import PrivateRoute from '../components/Auth/PrivateRoute';
import Chats from '../components/ChatList/ChatsList';
import NewChat from '../components/NewChat/NewChat';

let useStyles = makeStyles(theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
	},
}));
function MainView() {
	var {
		membersManagementUrl,
		moviesManagementUrl,
		usersManagementUrl,
	} = useContext(MainContext);

	var classes = useStyles();
	return (
		<Container
			id='siteContainer'
			disableGutters
			className={classes.root}
			maxWidth={false}>
			<Switch>
				<Route exact path='/'>
					<PrivateRoute {...{ component: Chats }} />
				</Route>
				<Route path='/new'>
					<PrivateRoute {...{ component: NewChat }} />
				</Route>
			</Switch>

			<Footer />
		</Container>
	);
}

export default function Main(props) {
	return <MainView />;
}
