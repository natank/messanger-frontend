import { Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';
import * as Conversation from '../../Model/conversation-model';
import FeedNewMessage from './FeedNewMessage';
import { submitNewConversation } from '../../Utils/utils';

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
	const [newMessageInProgress, setNewMessageInProgress] = useState(undefined);
	if (!currentConversation) {
		history.push('/');
		return null;
	}

	async function createMessage({ message }) {
		if (currentConversation._id) {
			try {
				await Conversation.createMessage({
					conversationId: currentConversation._id,
					authorId: authUser.id,
					text: message,
				});

				dispatch({
					type: 'ADD_MESSAGE',
					payload: {
						text: message,
						author: authUser,
					},
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
				// Enter the component to "message in progress state"
				setNewMessageInProgress({
					conversation: newConversation,
					message: { author: authUser, messageText: message },
				});
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
	useEffect(() => {
		if (newMessageInProgress)
			dispatch({
				type: 'SET_CURRENT_CONVERSATION',
				payload: {
					...newMessageInProgress.conversation,
					messages: [newMessageInProgress.message],
				},
			});
	}, [newMessageInProgress]);
	useEffect(() => {
		async function addMessage() {
			if (currentConversation && newMessageInProgress) {
				try {
					await Conversation.createMessage({
						conversationId: currentConversation._id,
						author: authUser.id,
						text: newMessageInProgress.message.messageText,
					});
					setNewMessageInProgress(undefined);
				} catch (error) {
					throw error;
				}
			}
		}
		addMessage();
	}, [currentConversation]);

	return (
		<Container disableGutters className={classes.root}>
			<FeedHeader />
			<FeedBody messages={currentConversation.messages} />
			<FeedNewMessage createMessage={createMessage} />
		</Container>
	);
}
