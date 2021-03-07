import React, { useEffect, useContext, useRef } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import FeedMessage from './FeedMessage';
import { MainContext } from '../../Context/main-context';
import * as Conversation from '../../Model/conversation-model';

let useStyles = makeStyles({
	root: {
		backgroundColor: 'gray',
		color: '#fff',
		flexGrow: '1',
		maxHeight: '60vh',
		padding: '1rem',
		overflow: 'hidden',
		overflowY: 'scroll',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	messages: {
		flexGrow: '9',
	},
});

export default function FeedBody({ messages }) {
	const classes = useStyles();

	const { store } = useContext(MainContext);
	const [state, dispatch] = store;
	const { currentConversation, authUser } = state;

	const messageRef = useRef();

	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			});
		}
	});

	return (
		<Container className={classes.root}>
			<div ref={messageRef} className={classes.messages}>
				{messages ? (
					messages.map((message, index) => (
						<FeedMessage
							messageText={message.text}
							author={message.writtenBy}
							key={index}
						/>
					))
				) : (
					<div>Waiting for messages to be loaded</div>
				)}
			</div>
		</Container>
	);
}
