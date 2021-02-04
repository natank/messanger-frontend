import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';
import {MainContext} from '../../Context/main-context'

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
	let history = useHistory();
	let {currentChatDetails} = useContext(MainContext);

	return (
		<ListItem button onClick = {onChatClick}> 
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

	function onChatClick(){
		let details = {chatId: chatDetails.chatId, withUser: chatDetails.withUser}
		currentChatDetails = chatDetails;
		history.push('/feed')
	}
}
