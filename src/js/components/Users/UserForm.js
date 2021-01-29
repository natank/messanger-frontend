import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	TextField,
	Grid,
	Typography,
	FormGroup,
	FormControlLabel,
	Button,
	Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UsersManagementContext } from '../../Context/users-management-context';

var useStyles = makeStyles({
	userDataTitle: {
		fontWeight: '700',
		marginRight: '1rem',
	},
});

export default function UserForm({
	userDetails,
	editedUserPermissions,
	actionText,
	onSubmit,
}) {
	if (actionText == 'Update') {
		var {
			firstName,
			lastName,
			userName,
			sessionTimeOut,
			createdDate,
		} = userDetails;
		createdDate = new Date(parseInt(createdDate));
		createdDate = createdDate
			.toLocaleString()
			.split(',')[0]
			.replaceAll('.', '/');
	}
	var [firstName, setFirstName] = useState(firstName || '');
	var [lastName, setLastName] = useState(lastName || '');
	var [userName, setUserName] = useState(userName || '');
	var [sessionTimeOut, setSessionTimeOut] = useState(sessionTimeOut || '');
	var editedUserId = userDetails ? userDetails.id : '';

	var userPermissions = editedUserPermissions
		? editedUserPermissions.userPermissions
		: {};
	var { subscriptions, movies } = userPermissions || {};

	var [viewSubscriptions, setViewSubscriptions] = subscriptions
		? useState(subscriptions.view)
		: useState(false);
	var [createSubscriptions, setCreateSubscriptions] = subscriptions
		? useState(subscriptions.create)
		: useState(false);
	var [deleteSubscriptions, setDeleteSubscriptions] = subscriptions
		? useState(subscriptions.delete)
		: useState(false);
	var [updateSubscriptions, setUpdateSubscriptions] = subscriptions
		? useState(subscriptions.edit)
		: useState(false);
	var [viewMovies, setViewMovies] = movies
		? useState(movies.view)
		: useState(false);
	var [createMovies, setCreateMovies] = movies
		? useState(movies.create)
		: useState(false);
	var [deleteMovies, setDeleteMovies] = movies
		? useState(movies.delete)
		: useState(false);
	var [updateMovies, setUpdateMovies] = movies
		? useState(movies.edit)
		: useState(false);

	var classes = useStyles();
	function onPermissionChange(e, collection, action) {
		if (e.target.checked == true)
			collection == 'subscriptions'
				? setViewSubscriptions(true)
				: setViewMovies(true);
		var permissionValue = e.target.checked;
		switch (action) {
			case 'view':
				collection == 'subscriptions'
					? setViewSubscriptions(permissionValue)
					: setViewMovies(permissionValue);
				if (!permissionValue) {
					collection == 'subscriptions'
						? setCreateSubscriptions(false)
						: setCreateMovies(false);
					collection == 'subscriptions'
						? setDeleteSubscriptions(false)
						: setDeleteMovies(false);
					collection == 'subscriptions'
						? setUpdateSubscriptions(false)
						: setUpdateMovies(false);
				}
				break;
			case 'create':
				collection == 'subscriptions'
					? setCreateSubscriptions(permissionValue)
					: setCreateMovies(permissionValue);
				break;
			case 'update':
				collection == 'subscriptions'
					? setUpdateSubscriptions(permissionValue)
					: setUpdateMovies(permissionValue);
				break;
			case 'delete':
				collection == 'subscriptions'
					? setDeleteSubscriptions(permissionValue)
					: setDeleteMovies(permissionValue);
				break;
			default:
				throw new Error('Change permission error: unknown option');
		}
	}

	function getFieldsData() {
		return [
			{
				type: 'text',
				onChange: e => setFirstName(e.target.value),
				label: 'First Name:',
				name: 'firstName',
				value: firstName || '',
			},

			{
				type: 'text',
				onChange: e => setLastName(e.target.value),
				label: 'Last Name:',
				name: 'lastName',
				value: lastName || '',
			},

			{
				type: 'text',
				onChange: e => setUserName(e.target.value),
				label: 'User Name:',
				name: 'userName',
				value: userName || '',
			},

			{
				type: 'text',
				onChange: e => setSessionTimeOut(e.target.value),
				label: 'Session Timeout:',
				name: 'sessionTimeout',
				value: sessionTimeOut || '',
			},

			{
				type: 'fixed',
				label: actionText === 'Update' ? 'Created date' : '',
				name: 'Created',
				value: createdDate || '',
			},

			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'subscriptions', 'view'),
				label: 'View Subscriptions:',
				checked: viewSubscriptions,
				name: 'viewSubscriptions',
			},

			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'subscriptions', 'create'),
				label: 'Create Subscriptions:',
				checked: createSubscriptions,
				name: 'createSubscriptions',
			},

			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'subscriptions', 'delete'),
				label: 'Delete Subscriptions:',
				checked: deleteSubscriptions,
				name: 'deleteSubscriptions',
			},

			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'subscriptions', 'update'),
				label: 'Update Subscriptions:',
				checked: updateSubscriptions,
				name: 'updateSubscriptions',
			},

			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'movies', 'view'),
				label: 'View Movies:',
				checked: viewMovies,
				name: 'viewMovies',
			},
			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'movies', 'create'),
				label: 'Create Movies:',
				checked: createMovies,
				name: 'createMovies',
			},
			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'movies', 'delete'),
				label: 'Delete Movies:',
				checked: deleteMovies,
				name: 'deleteMovies',
			},
			{
				type: 'checkbox',
				onChange: e => onPermissionChange(e, 'movies', 'update'),
				label: 'Update Movies:',
				checked: updateMovies,
				name: 'updateMovies',
			},
		];
	}

	var { usersManagementUrl } = useContext(UsersManagementContext);
	var data = getFieldsData(userDetails);

	async function onFormSubmit(event) {
		event.preventDefault();
		var userDetails = { firstName, lastName, userName, sessionTimeOut };

		var userPermissions = {
			userId: editedUserId,
			userPermissions: {
				subscriptions: {
					view: viewSubscriptions,
					edit: updateSubscriptions,
					delete: deleteSubscriptions,
					create: createSubscriptions,
				},
				movies: {
					view: viewMovies,
					edit: updateMovies,
					delete: deleteMovies,
					create: createMovies,
				},
			},
		};
		await onSubmit(userDetails, userPermissions);
	}
	return (
		<form onSubmit={onFormSubmit}>
			<Grid container direction='column' spacing={3}>
				<Grid item container spacing={3}>
					{renderFields(data.slice(0, 5))}
				</Grid>
				<Grid item container>
					<Grid item xs={12} md={3}>
						<Typography className={classes.userDataTitle} gutterBottom>
							Permissions:
						</Typography>
					</Grid>
					<Grid item container spacing={3} justify='center' xs={12} md={9}>
						<Grid item xs={6}>
							<FormGroup>{renderFields(data.slice(5, 9))}</FormGroup>
						</Grid>
						<Grid item xs={6}>
							<FormGroup>{renderFields(data.slice(9))}</FormGroup>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container spacing={3} justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' type='submit'>
							{actionText}
						</Button>
					</Grid>
					<Grid item>
						<Button component={Link} to={usersManagementUrl}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);

	function renderFields(fields) {
		return fields.map(function renderField({
			label,
			type,
			value,
			onChange,
			name,
			checked,
		}) {
			switch (type) {
				case 'text':
					return (
						<Grid item xs={12} md={6} key={name}>
							<TextField
								fullWidth
								required
								label='Name'
								label={label}
								onChange={onChange}
								value={value}
							/>
						</Grid>
					);
				case 'checkbox':
					return (
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={onChange}
									name={name}
									color='primary'
								/>
							}
							label={label}
							key={name}
							style={{ fontSize: '10px' }}
						/>
					);
				case 'fixed':
					return (
						<Grid item container xs={12} md={6} key={name}>
							<Typography className={classes.userDataTitle}>{label}</Typography>
							<Typography>{value}</Typography>
						</Grid>
					);

				default:
					return null;
			}
		});
	}
}
