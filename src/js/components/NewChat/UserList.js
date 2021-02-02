import { List } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import UserItem from './UserItem';

export default function UserList({ users, onUserSelected }) {
	return (
		<List>
			{users
				? users.map((user, index) => (
						<UserItem key={index} user={user} onUserSelected={onUserSelected} />
				  ))
				: null}
		</List>
	);
}
