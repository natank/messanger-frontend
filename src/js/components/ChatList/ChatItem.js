import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';
import { MainContext } from '../../Context/main-context';

export default function ChatItem({ chatDetails }) {
	let [isCurrentChat, setIsCurrentChat] = useState(false);
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;
	let { currentChat } = state;

	useEffect(() => {
		if (isCurrentChat) {
			dispatch({
				type: 'SET_CURRENT_CHAT',
				payload: chatDetails,
			});
		}
	}, [isCurrentChat]);

	useEffect(() => {
		if (
			isCurrentChat &&
			currentChat &&
			currentChat.chatId == chatDetails.chatId
		) {
			history.push('/feed');
		}
	});

	if (chatDetails.chatName) {
		var avatarSrc = groupAvatar;
		var avatarAlt = 'group avatar';
		var chatName = chatDetails.chatName;
	} else if (chatDetails.withUser && chatDetails.withUser.gender == 'f') {
		avatarSrc = womanAvatar;
		avatarAlt = 'woman avatar';
		chatName = chatDetails.withUser.username;
	} else {
		avatarSrc = manAvatar;
		avatarAlt = 'man avatar';
		chatName = chatDetails.withUser.username;
	}
	let history = useHistory();

	return (
		<ListItem button onClick={onChatClick}>
			<ListItemAvatar>
				<Avatar alt={avatarAlt} src={avatarSrc} />
			</ListItemAvatar>
			<ListItemText>
				<h2>{chatName}</h2>
				<p>
					{chatDetails.latestMessage
						? `${chatDetails.latestMessage.username}: ${chatDetails.latestMessage.text}`
						: null}
				</p>
			</ListItemText>
		</ListItem>
	);

	function onChatClick() {
		setIsCurrentChat(true);
	}
}
