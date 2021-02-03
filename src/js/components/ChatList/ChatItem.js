import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';
import { Avatar } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';

export default function ChatItem({ chatDetails }) {

	if(chatDetails.chatName){
		var avatarSrc = groupAvatar;
		var avatarAlt = "group avatar"
		var chatName = chatDetails.chatName
	} else if(chatDetails.withUser && chatDetails.withUser.gender == 'f'){
		avatarSrc = womanAvatar;
		avatarAlt = "woman avatar"
		chatName = chatDetails.withUser.username
	} else {
		avatarSrc = manAvatar;
		avatarAlt = "man avatar"
		chatName = chatDetails.withUser.username
	}

	return (
		<ListItem button>
			<ListItemAvatar>
				<Avatar alt={avatarAlt} src={avatarSrc} />
			</ListItemAvatar>
			<ListItemText>
				<h2>{chatName}</h2>
				<p>
					{chatDetails.latestMessage ? `${chatDetails.latestMessage.username}: ${chatDetails.latestMessage.text}`: null}
				</p>
			</ListItemText>
		</ListItem>
	);
}
