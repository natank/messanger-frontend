import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainContextProvider } from './Context/main-context';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import App from './App';

const theme = createMuiTheme({
	status: {
		danger: orange[500],
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Router>
			<MainContextProvider>
				<App />
			</MainContextProvider>
		</Router>
	</ThemeProvider>,
	document.querySelector('#root')
);
