import { Button, makeStyles, Typography } from '@material-ui/core';

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContainer from '../Common/HeaderContainer';
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

export default function FeedHeader({ setMode }) {
	let classes = useStyles();
	let history = useHistory();
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;
	let { currentConversation } = state;

	function handleChange(event, newValue) {}

	let conversationTitle = currentConversation.name
		? currentConversation.name
		: currentConversation.withUser.username;
	let conversationParticipants = currentConversation.members
		? currentConversation.members
				.map(member => member.username)
				.toString()
				.replace(',', ', ')
		: null;
	return (
		<Container disableGutters className={classes.root}>
			<Button color='inherit'>
				<ArrowBack onClick={() => {
					 history.push('/')
				}} />
			</Button>
			<Avatar alt='woman avatar' src={womanAvatar} />
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
