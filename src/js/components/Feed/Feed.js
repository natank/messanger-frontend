import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';
import openSocket from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import * as Conversation from '../../Model/conversation-model';
import FeedNewMessage from './FeedNewMessage';
import { submitNewConversation } from '../../Utils/utils';
import { database } from 'firebase';

let useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: '1',
	},
	newMessage: {
		width: '100%',
	},
});

export default function Feed() {
	const classes = useStyles();
	const history = useHistory();
	const { store } = useContext(MainContext);
	const [state, dispatch] = store;
	const { currentConversation, authUser } = state;

	if (!currentConversation) {
		history.push('/');
		return null;
	}

	async function createMessage({ message }) {
		if (currentConversation._id) {
			try {
				await Conversation.createMessage({
					conversationId: currentConversation._id,
					author: authUser,
					text: message,
				});
			} catch (error) {
				console.log(error);
				throw error;
			}
		} else {
			try {
				const withUser = currentConversation.members.find(member => member._id);
				// create new conversation,
				const newConversation = await submitNewConversation({
					members: [{ _id: withUser._id }],
					authUser: { _id: authUser.id },
				});

				await Conversation.createMessage({
					conversationId: newConversation._id,
					author: authUser,
					text: message,
				});

				const conversation = await Conversation.getConversation({
					conversationId: newConversation._id,
					userId: authUser.id,
				});

				dispatch({
					type: 'SET_CURRENT_CONVERSATION',
					payload: conversation,
				});
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}

	useEffect(() => {
		const socket = openSocket('http://localhost:8080');
		socket.on('message', data => {
			if (data.action === 'create') {
				dispatch({
					type: 'ADD_MESSAGE',
					payload: {
						text: data.message.text,
						author: data.message.author,
						conversationId: data.message.conversationId,
					},
				});
			}
		});
	}, []);
	return (
		<Container disableGutters className={classes.root}>
			<FeedHeader />
			<FeedBody messages={currentConversation.messages} />
			<FeedNewMessage createMessage={createMessage} />
		</Container>
	);
}
