import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';
import { MainContext } from '../../Context/main-context';
import * as Conversation from '../../Model/conversation-model';

export default function ConversationItem({ conversationDetails }) {
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;
	let { authUser } = state;

	if (conversationDetails.name) {
		var avatarSrc = groupAvatar;
		var avatarAlt = 'group avatar';
		var conversationName = conversationDetails.name;
	} else if (
		conversationDetails.withUser &&
		conversationDetails.withUser.gender == 'female'
	) {
		avatarSrc = womanAvatar;
		avatarAlt = 'woman avatar';
		conversationName = conversationDetails.withUser.username;
	} else {
		avatarSrc = manAvatar;
		avatarAlt = 'man avatar';
		conversationName = conversationDetails.withUser.username;
	}

	return (
		<ListItem button onClick={onConversationClick}>
			<ListItemAvatar>
				<Avatar alt={avatarAlt} src={avatarSrc} />
			</ListItemAvatar>
			<ListItemText>
				<h2>{conversationName}</h2>
				<p>
					{conversationDetails.latestMessage
						? `${conversationDetails.latestMessage.username}: ${conversationDetails.latestMessage.text}`
						: null}
				</p>
			</ListItemText>
		</ListItem>
	);

	async function onConversationClick() {
		//get the current conversation from DB
		if(conversationDetails._id)  await handleGroupConversation()// existing conversation
		else if(conversationDetails.withUser) handlePrivateConversation()
		else {
			throw "conversation doesn't exist"
		}

		async function handleGroupConversation(){
			try {
				let conversation = await Conversation.getConversation({
					conversationId: conversationDetails._id,
					userId: authUser.id,
				});
				dispatch({
					type: 'SET_CURRENT_CONVERSATION',
					payload: conversation,
				});
			} catch (error) {
				throw error;
			}
		}
		 
		function handlePrivateConversation(){
			const conversation = {
				withUser: conversationDetails.withUser
			}
			dispatch({
				type: 'SET_CURRENT_CONVERSATION',
				payload: conversation,
			});
		} 

		

		
	}
}
