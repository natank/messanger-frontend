import { Button, makeStyles, Typography } from '@material-ui/core';

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { Avatar, Container } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';
import { MainContext } from '../../Context/main-context';

let useStyles = makeStyles({
	root: {
		display: 'flex',
		padding: '.5rem',
		justifyContent: 'space-between',
		backgroundColor: 'green',
		color: '#fff',
	},
});

export default function FeedHeader() {
	let classes = useStyles();
	let history = useHistory();
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;
	let { currentConversation } = state;

	function handleChange(event, newValue) {}

	const conversationTitle = currentConversation.name
		? currentConversation.name
		: currentConversation.withUser.username;
	const conversationParticipants = currentConversation.members
		? currentConversation.members
				.map(member => member.username)
				.toString()
				.replace(',', ', ')
		: null;
	function determineConversationAvatar() {
		const { withUser } = currentConversation;
		if (!withUser) return groupAvatar;
		else if (withUser.gender == 'female') return womanAvatar;
		else if (withUser.gender == 'male') return manAvatar;
		else throw 'illegal gender name';
	}
	const conversationAvatar = determineConversationAvatar();

	return (
		<Container disableGutters className={classes.root}>
			<Button color='inherit'>
				<ArrowBack
					onClick={() => {
						history.push('/');
						dispatch({ type: 'RESET_CURRENT_CONVERSATION' });
					}}
				/>
			</Button>
			<Avatar alt='woman avatar' src={conversationAvatar} />
			<Container>
				<Typography variant='subtitle1'>{conversationTitle}</Typography>
				{conversationParticipants ? (
					<Typography variant='subtitle2'>
						{conversationParticipants}
					</Typography>
				) : null}
			</Container>
		</Container>
	);
}
