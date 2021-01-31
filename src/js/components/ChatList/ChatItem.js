import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';
import { Avatar } from '@material-ui/core';

/**
 * {
		name: 'JR Devs',
		latestMessage: {
			user: 'Maya',
			text: 'sed do eiusmod',
		},
		avatar: groupAvatar,
	}
 * 
 */

export default function ChatItem({ chatDetails }) {
	return (
		<ListItem button>
			<ListItemAvatar>
				<Avatar alt='female avatar' src={chatDetails.avatar} />
			</ListItemAvatar>
			<ListItemText>
				<h2>{chatDetails.name}</h2>
				<p>
					{`${chatDetails.latestMessage.user}: ${chatDetails.latestMessage.text}`}
				</p>
			</ListItemText>
		</ListItem>
	);
}
