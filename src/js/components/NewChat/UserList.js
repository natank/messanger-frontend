import { List } from '@material-ui/core';
import React, { useState } from 'react';

var defaultUsers = [{ name: 'Amit' }, { name: 'Tal' }, { name: 'Dafna' }];

export default function UserList(props) {
	let [users, setUsers] = useState(null);
	useEffect(() => {
		if (!users) setUsers(defaultUsers || null);
	});
	return (
		<List>
			{users.map(user => (
				<div>{user.name}</div>
			))}
		</List>
	);
}
