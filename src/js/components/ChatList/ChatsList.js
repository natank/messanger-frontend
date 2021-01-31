import { List } from '@material-ui/core';
import { Fragment } from 'react';

import HeaderRouter from './HeaderRouter';
import ChatBox from './ChatItem';
import React from 'react';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';

let chats = [
	{
		name: 'Amit',
		latestMessage: {
			user: 'Amit',
			text: 'Hi',
		},
		avatar: womanAvatar,
	},
	{
		name: 'Gal',
		latestMessage: {
			user: 'Gal',
			text: 'Duis aute irure dolor in reprehenderit?',
		},
		avatar: manAvatar,
	},
	{
		name: 'JR Devs',
		latestMessage: {
			user: 'Maya',
			text: 'sed do eiusmod',
		},
		avatar: groupAvatar,
	},
];

export default function Chats(props) {
	let v = 1;
	return (
		<Fragment>
			<HeaderRouter />
			<List aria-label='recent chats list'>
				{chats.map((chat, index) => (
					<ChatBox key={index} chatDetails={chat} />
				))}
			</List>
		</Fragment>
	);
}
