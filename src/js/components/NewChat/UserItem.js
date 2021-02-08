import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';
import React from 'react';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';

export default function UserItem({ user: userDetails, onUserSelected }) {
	return (
		<ListItem button onClick={event => onUserSelected(userDetails.id)}>
			<ListItemAvatar>
				<Avatar
					alt={userDetails.gender == 'm' ? 'male avatar' : 'female avatar'}
					src={userDetails.gender == 'm' ? manAvatar : womanAvatar}
				/>
			</ListItemAvatar>
			<ListItemText>
				<h2>{userDetails.username}</h2>
				<p>{userDetails.status}</p>
			</ListItemText>
		</ListItem>
	);
}
