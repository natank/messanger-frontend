import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../Context/main-context';
import { Container, Grid } from '@material-ui/core';

import Footer from '../components/Footer';

/**App components */
import PrivateRoute from '../components/Auth/PrivateRoute';
import Chats from '../components/ChatList/ChatsList';
import NewChat from '../components/NewChat/NewChat';
import Feed from '../components/Feed/Feed';
import Login from '../components/Auth/Login';

let useStyles = makeStyles(theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
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
			disableGutters={true}
			className={classes.root}
			maxWidth={false}>
			<Switch>
				<Route exact path='/'>
					<PrivateRoute {...{ component: Chats }} />
				</Route>
				<Route path='/new'>
					<PrivateRoute {...{ component: NewChat }} />
				</Route>
				<Route path='/feed'>
					<PrivateRoute {...{ component: Feed }} />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
			</Switch>

			<Footer />
		</Container>
	);
}

export default function Main(props) {
	return <MainView />;
}
