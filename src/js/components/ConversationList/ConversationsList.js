import { List } from '@material-ui/core';
import { Fragment } from 'react';

import React, { useState, useEffect, useContext } from 'react';

import ConversationBox from './ConversationItem';
import HeaderRouter from './HeaderRouter';
import * as ConversationModel from '../../Model/conversation-model';
import { MainContext } from '../../Context/main-context';
import { makeStyles } from '@material-ui/styles';

let useStyles = makeStyles({
	root: {
		overflowY: 'scroll',
		height: '60vh',
	},
});

export default function Conversations() {
	const { store } = useContext(MainContext);
	const [state, dispatch] = store;
	const { authUser, conversations } = state;
	const classes = useStyles();
	useEffect(() => {
		if (!conversations) {
			ConversationModel.getConversations(authUser.id)
				.then(conversations => {
					dispatch({
						type: 'ADD_CONVERSATIONS',
						payload: conversations,
					});
				})
				.catch(err => {
					console.log(err);
					throw err;
				});
		}
	}, []);

	return (
		<Fragment>
			<HeaderRouter />
			<List aria-label='recent conversations list' className={classes.root}>
				{conversations &&
					conversations.map((conversationDetails, index) => (
						<ConversationBox
							key={index}
							conversationDetails={conversationDetails}
						/>
					))}
			</List>
		</Fragment>
	);
}
