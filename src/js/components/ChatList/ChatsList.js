import { List } from '@material-ui/core';
import { Fragment } from 'react';

import React, { useState, useEffect, useContext } from 'react';

import ChatBox from './ChatItem';
import HeaderRouter from './HeaderRouter';
import * as ChatModel from '../../Model/chat-model';
import { MainContext } from '../../Context/main-context';

export default function Chats(props) {
	var [chats, setChats] = useState(undefined);

	useEffect(() => {
		if (!chats) {
			ChatModel.getChats()
				.then(chats => {
					setChats(chats);
				})
				.catch(err => console.log(err));
		}
	}, []);

	return (
		<Fragment>
			<HeaderRouter />
			<List aria-label='recent chats list'>
				{chats &&
					chats.map((chatDetails, index) => (
						<ChatBox key={index} chatDetails={chatDetails} />
					))}
			</List>
		</Fragment>
	);
}
