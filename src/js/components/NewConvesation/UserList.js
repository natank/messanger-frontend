import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../../Context/main-context';
import React, { useContext } from 'react';
import UserItem from './UserItem';

const useStyles = makeStyles({
	root: {
		height: '66vh',
		overflow: 'scroll',
	},
});

export default function UserList({ users, onUserSelected }) {
	const classes = useStyles();
	const { store } = useContext(MainContext);
	const [state, dispatch] = store;
	const { authUser } = state;

	return (
		<List className={classes.root}>
			{users
				? users
						.filter(user => {
							let result = user.id != authUser.id;
							return result;
						})
						.map((user, index) => (
							<UserItem
								key={index}
								user={user}
								onUserSelected={onUserSelected}
							/>
						))
				: null}
		</List>
	);
}
