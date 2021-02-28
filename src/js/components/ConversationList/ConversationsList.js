/**Material UI dependencies */
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

/** React dependencies */
import { Fragment } from 'react';
import React, { useState, useEffect, useContext } from 'react';

/** Components */
import ConversationBox from './ConversationItem';
import HeaderRouter from './HeaderRouter';
/** Context */
import { MainContext } from '../../Context/main-context';

/** Models */
import * as ConversationModel from '../../Model/conversation-model';

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

	//used to store conversations that were received by filter value
	const [filteredConversations, setFilteredConversations] = useState(null);
	const [displayedConversations, setDisplayedConversations] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		if (!conversations) {
			ConversationModel.getConversations({ userId: authUser.id })
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
		} else {
			setDisplayedConversations(conversations);
		}
	}, [conversations]);

	useEffect(() => {
		if (filteredConversations) {
			setDisplayedConversations(filteredConversations);
		} else {
			if (conversations) setDisplayedConversations(conversations);
		}
	}, [filteredConversations]);

	return (
		<Fragment>
			<HeaderRouter onFilterChanged={onFilterChanged} />
			<List aria-label='recent conversations list' className={classes.root}>
				{displayedConversations &&
					displayedConversations.map((conversationDetails, index) => {
						if (conversationDetails.withUser) {
							conversationDetails.username =
								conversationDetails.withUser.username;
						}
						return (
							<ConversationBox
								key={index}
								conversationDetails={conversationDetails}
							/>
						);
					})}
			</List>
		</Fragment>
	);

	async function onFilterChanged(filter) {
		// return null if the filter is empty
		if (!filter || filter.length < 1) {
			setFilteredConversations(null);
			return;
		}

		// get the filtered conversations
		try {
			const conversations = await ConversationModel.getConversations({
				userId: authUser.id,
				filter,
			});
			setFilteredConversations(conversations);
		} catch (error) {
			throw error;
		}
	}
}
