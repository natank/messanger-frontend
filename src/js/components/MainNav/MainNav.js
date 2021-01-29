import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';

import {
	Container,
	AppBar,
	Toolbar,
	Tabs,
	Tab,
	Typography,
	useScrollTrigger,
	Button,
} from '@material-ui/core';
import { MainContext } from '../../Context/main-context';
import { checkAccessToRoute } from '../../Utils/utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MobileNav from './MobileNav';

function ElevationScroll(props) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	navLink: {
		color: 'white',
	},
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '.2em',
		[theme.breakpoints.up('md')]: {
			marginBottom: '3em',
		},
		[theme.breakpoints.up('lg')]: {
			marginBottom: '4em',
		},
	},
	tabContainer: {
		marginLeft: 'auto',
	},
	tab: {
		marginLeft: '25px',
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.08),
		},
	},
	logoContainer: {
		textTransform: 'none',
		color: theme.palette.secondary.contrastText,
		padding: '0 1rem',
		marginLeft: 0,
		backgroundColor: theme.palette.grey[900],
		height: '5em',
		'&:hover': {
			backgroundColor: theme.palette.grey[800],
		},
		[theme.breakpoints.up('md')]: {
			height: '7em',
		},
		[theme.breakpoints.up('lg')]: {
			height: '8em',
		},
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
	},
}));

function MainNav(props) {
	const { routes } = props;
	var {
		membersManagementUrl,
		moviesManagementUrl,
		usersManagementUrl,
		store,
	} = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	var classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
	const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (window.location.pathname === '/' && value !== 0) {
			setValue(0);
		} else if (
			window.location.pathname === moviesManagementUrl &&
			value !== 1
		) {
			setValue(1);
		} else if (
			window.location.pathname === membersManagementUrl &&
			value !== 2
		) {
			setValue(2);
		} else if (window.location.pathname === usersManagementUrl && value != 3) {
			setValue(3);
		}
	});

	const tabs = matchesLG ? (
		<Tabs
			variant='fullWidth'
			value={authUser ? value : 0}
			onChange={handleChange}
			aria-label='nav tabs'
			className={classes.tabContainer}
			indicatorColor='primary'>
			{routes.map((elem, index) => getRoute(elem, index))}

			<Tab
				className={classes.tab}
				label={authUser ? 'Logout' : 'Login'}
				onClick={authUser ? onLogout : () => history.push('/Login')}
			/>
		</Tabs>
	) : (
		<MobileNav
			routes={routes}
			value={value}
			setValue={setValue}
			ToolbarMargin={ToolbarMargin}
			onLogout={onLogout}
		/>
	);

	return (
		<React.Fragment>
			<ElevationScroll {...props} className={classes.root}>
				<AppBar color='primary' className={classes.appbarContainer}>
					<Toolbar disableGutters>
						<Button
							component={Link}
							to='/'
							className={classes.logoContainer}
							onClick={() => setValue(0)}>
							<Typography
								variant={matchesLG ? 'h4' : matchesMD ? 'h5' : 'h6'}
								align='center'>
								MovieNG
							</Typography>
						</Button>
						{tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<ToolbarMargin />
		</React.Fragment>
	);
	function onLogout(event) {
		event.preventDefault();
		sessionStorage.removeItem('user');
		dispatch({
			type: 'LOGOUT_USER',
		});
	}

	function ToolbarMargin() {
		return <div className={classes.toolbarMargin} />;
	}
	function getRoute(route, key) {
		var isAuthorized = checkAccessToRoute(route.url, authUser);
		return isAuthorized ? (
			<Tab
				key={key}
				label={route.title}
				component={Link}
				to={route.url}
				className={classes.tab}
			/>
		) : null;
	}
}

export default MainNav;
