import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import React from 'react';
import UserItem from './UserItem';

const useStyles = makeStyles({
	root: {
		height: '66vh',
		overflow: 'scroll',
	},
});

export default function UserList({ users, onUserSelected }) {
	let classes = useStyles();
	return (
		<List className={classes.root}>
			{users
				? users.map((user, index) => (
						<UserItem key={index} user={user} onUserSelected={onUserSelected} />
				  ))
				: null}
		</List>
	);
}
