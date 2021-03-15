import { Container, makeStyles } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import * as Conversation from '../../Model/conversation-model';
import FeedNewMessage from './FeedNewMessage';

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

	const { messages } = currentConversation;

	async function createMessage({ message }) {
		if (currentConversation._id) {
			try {
				await Conversation.createMessage({
					conversationId: currentConversation._id,
					authorId: authUser.id,
					text: message,
					withUserId: currentConversation.withUser._id,
				});
				dispatch({
					type: 'ADD_MESSAGE',
					payload: {
						text: message,
						writtenBy: authUser,
					},
				});
			} catch (error) {
				console.log(error);
				throw error;
			}
		} else {
		}
	}

	return (
		<Container disableGutters className={classes.root}>
			<FeedHeader />
			<FeedBody messages={messages} />
			<FeedNewMessage createMessage={createMessage} />
		</Container>
	);
}
