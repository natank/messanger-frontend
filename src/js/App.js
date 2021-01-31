import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import theme from './Views/Theme';

import Login from './components/Auth/Login';
import CreateAccount from './components/Auth/CreateAccount';
import Main from './Views/main-view';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	appContainer: {
		position: 'relative',
	},
});

export default function App() {
	let classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='sm' className={classes.appContainer}>
				<Switch>
					<Route path='/login' exact>
						<Login />
					</Route>
					<Route path='/createAccount' exact>
						<CreateAccount />
					</Route>
					<Route path={'/'} component={Main} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}
