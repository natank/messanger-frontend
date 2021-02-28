import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Footer from '../components/Footer';

/**App components */
import PrivateRoute from '../components/Auth/PrivateRoute';
import Conversations from '../components/ConversationList/ConversationsList';
import NewConversation from '../components/NewConvesation/NewConversation';
import Feed from '../components/Feed/Feed';

let useStyles = makeStyles(theme => ({
	root: {
		minHeight: '100vh',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
}));

function MainView(props) {
	var classes = useStyles();

	return (
		<Container
			id='siteContainer'
			disableGutters={true}
			className={classes.root}
			maxWidth={false}>
			<Switch>
				<Route exact path='/'>
					<PrivateRoute {...{ component: Conversations }} />
				</Route>
				<Route path='/new'>
					<PrivateRoute {...{ component: NewConversation }} />
				</Route>
				<Route path='/feed'>
					<PrivateRoute {...{ component: Feed }} />
				</Route>
			</Switch>

			<Footer />
		</Container>
	);
}

export default function Main(props) {
	return <MainView />;
}
