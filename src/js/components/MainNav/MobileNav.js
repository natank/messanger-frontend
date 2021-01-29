import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { MainContext } from '../../Context/main-context';
import { checkAccessToRoute } from '../../Utils/utils';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
	Drawer,
	List,
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => {
	var stylesObj = {
		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
		},
		menuButton: {
			marginRight: theme.spacing(2),
			marginLeft: 'auto',
			'&:hover': {
				backgroundColor: 'transparent',
			},
		},
		drawerIcon: {
			height: '50px',
			width: '50px',
		},
		Hide: {
			display: 'none',
		},
		drawer: {
			backgroundColor: theme.palette.primary.dark,
		},
		drawerItem: {
			...theme.typography.tab,
			color: 'white',
			opacity: 0.7,
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.08),
			},
			'&$selected': {
				opacity: 1,
			},
		},
		selected: {
			/** requires empty object to override the basic style */
		},
	};

	return stylesObj;
});

var open, setOpen, classes, authUser;

export default function MobileNav(props) {
	var {
		membersManagementUrl,
		moviesManagementUrl,
		usersManagementUrl,
		store,
	} = useContext(MainContext);
	const { routes, value, setValue, ToolbarMargin, onLogout } = props;
	var [state, dispatch] = store;
	authUser = state.authUser;
	classes = useStyles();
	[open, setOpen] = useState(false);
	return (
		<React.Fragment>
			<IconButton
				color='inherit'
				aria-label='open drawer'
				onClick={toggleDrawer(true)}
				edge='start'
				className={clsx(classes.menuButton, open && classes.hide)}>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
			<Drawer
				anchor='left'
				open={open}
				onClose={toggleDrawer(false)}
				classes={{ paper: classes.drawer }}>
				<ToolbarMargin />
				{list(routes, value, setValue)}
				<ListItem
					divider
					button
					component={Link}
					to={authUser ? '/logout' : '/login'}
					onClick={e => {
						authUser && onLogout(e);
						setOpen(false);
					}}
					classes={{
						root: classes.drawerItem,
					}}>
					<ListItemText>{authUser ? 'Logout' : 'Login'}</ListItemText>
				</ListItem>
			</Drawer>
		</React.Fragment>
	);
}

function list(routes, value, setValue) {
	return (
		<div className={classes.fullList}>
			<List disablePadding>
				{routes.map((route, index) => {
					var isAuthorized = checkAccessToRoute(route.url, authUser);
					return isAuthorized ? (
						<ListItem
							divider
							button
							component={Link}
							to={route.url}
							key={route.title}
							onClick={() => {
								setOpen(false);
								setValue(index);
							}}
							selected={value == index}
							classes={{
								root: classes.drawerItem,
								selected: classes.selected,
							}}>
							<ListItemText>{route.title}</ListItemText>
						</ListItem>
					) : null;
				})}
			</List>
		</div>
	);
}

function toggleDrawer(open) {
	return event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setOpen(open);
	};
}
