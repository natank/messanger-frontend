import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { permissionsToString } from '../../Utils/utils';
import { MainContext } from '../../Context/main-context';
import { deleteUser } from '../../Model/user-model';
import { deleteUserPermissions } from '../../Model/user-permissions-model';

import { checkAccessToRoute } from '../../Utils/utils';

var useStyles = makeStyles({
	userDataTitle: {
		fontWeight: '700',
		marginRight: '1rem',
	},
});

function UserDetails({ user, userPermissions, match }) {
	var classes = useStyles();
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	var matchesMD = useMediaQuery(theme => theme.breakpoints.up('md'));
	var matchesLG = useMediaQuery(theme => theme.breakpoints.up('lg'));
	var matchesSM = useMediaQuery(theme => theme.breakpoints.up('sm'));

	if (user && userPermissions) {
		var editUserRoute = `${match.url}/edit/${user.id}`;
		var deleteUserRoute = `${match.url}/delete/${user.id}`;
		var isUserAllowedToDelete = checkAccessToRoute(deleteUserRoute, authUser);
		var isUserAllowedToEdit = checkAccessToRoute(editUserRoute, authUser);
		return (
			<Card variant='outlined' style={{ height: '320px' }}>
				<CardContent>
					{/**Card */}
					<Grid container spacing={1}>
						{/**Name */}
						<Grid item container xs={12}>
							<Typography className={classes.userDataTitle}>Name:</Typography>
							<Typography>{`${user.firstName} ${user.lastName}`}</Typography>
						</Grid>
						<Grid item container xs={12}>
							<Typography className={classes.userDataTitle}>
								User Name:
							</Typography>
							<Typography>{`${user.userName}`}</Typography>
						</Grid>
						<Grid item container xs={12}>
							<Typography className={classes.userDataTitle}>
								Session time out (Minutes):
							</Typography>
							<Typography>{`${user.sessionTimeOut}`}</Typography>
						</Grid>
						<Grid item container xs={12}>
							<Typography className={classes.userDataTitle}>
								Created Date:
							</Typography>
							<Typography>{`${formatDate(user.createdDate)}`}</Typography>
						</Grid>
						<Grid
							item
							container
							xs={12}
							style={{
								height: matchesLG
									? '70px'
									: matchesMD
									? '70px'
									: matchesSM
									? '30px'
									: '70px',
							}}>
							<Typography className={classes.userDataTitle}>
								Permissions:
							</Typography>
							<Typography>{permissionsToString(userPermissions)}</Typography>
						</Grid>
						<CardActions
							style={{
								paddingTop: matchesLG ? '2rem' : matchesMD ? '1rem' : '2rem',
							}}>
							{isUserAllowedToEdit ? (
								<Button
									variant='contained'
									color='primary'
									component={Link}
									to={editUserRoute}>
									Edit
								</Button>
							) : null}
							{isUserAllowedToDelete ? (
								<Button onClick={onDeleteUser}>Delete</Button>
							) : null}
						</CardActions>
					</Grid>
				</CardContent>
			</Card>
		);
	} else return null;

	function formatDate(timestampArg) {
		var timestamp = timestampArg || Date.now();
		var dateObj = new Date(timestamp);
		var date = dateObj.toLocaleDateString().split(',')[0].replaceAll('.', '/');

		return date;
	}

	async function onDeleteUser(event) {
		var userId = user.id;
		event.preventDefault();
		var userPermissions = state.usersPermissions.find(
			userPermissions => userPermissions.userId == userId
		);
		if (!userPermissions)
			throw Error("Can't delete user, user permissions not found");
		var userPermissionsId = userPermissions.id;
		try {
			await deleteUser(userId);

			await deleteUserPermissions(userPermissionsId);
		} catch (err) {
			console.log(err);
		}

		dispatch({
			type: 'REMOVE_USER',
			payload: {
				userId,
				userPermissionsId,
			},
		});
	}
}

export default UserDetails;
