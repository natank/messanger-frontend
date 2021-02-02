/**material ui components */
import { Container, Fab, Input } from '@material-ui/core';
/**icons */
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

/**app components */
import Header from './NewChatHeader';
import SelectedUsers from './SelectedUsers';
import UserList from './UserList';
import * as User from '../../Model/user-model';
import { MainContext } from '../../Context/main-context';

let useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
	},
	action: {
		position: 'fixed',
		top: '80vh',
		right: '30%',
		zIndex: '1000',
		backgroundColor: 'green',
	},
	input: {
		paddingTop: '2rem',
		paddingBottom: '3rem',
	},
	submit: {
		position: 'absolute',
		top: '8rem',
		right: '0',
		backgroundColor: 'green',
	},
}));

export default function NewChat() {
	let classes = useStyles();
	let history = useHistory();
	let context = useContext(MainContext);
	let [state, setState] = useState({
		listUsers: context.users,
		selectedUsers: [],
	});
	let [mode, setMode] = useState('start'); /*search, subject */
	let [gropupName, setGroupName] = useState('');

	return (
		<Container disableGutters={true}>
			<Header mode={mode} setMode={setMode} />
			{mode == 'subject' ? (
				<Container disableGutters={true} className={classes.input}>
					<Input
						fullWidth={true}
						placeholder='Type group subject here...'
						value={gropupName}
						onChange={event => {
							setGroupName(event.target.value);
						}}
					/>
				</Container>
			) : null}

			<SelectedUsers selectedUsers={[...state.selectedUsers]} mode={mode} />

			{mode !== 'subject' ? (
				<UserList
					onUserSelected={onUserSelected}
					users={[...state.listUsers]}
				/>
			) : null}

			{/**submit group button*/}

			{state.selectedUsers.length > 0 && gropupName.length > 0 ? (
				<Fab
					color='secondary'
					className={classes.submit}
					onClick={() => {
						history.push('/');
					}}>
					<CheckIcon />
				</Fab>
			) : null}

			{/**continue to group subject button */}

			{state.selectedUsers.length > 0 && mode !== 'subject' ? (
				<Fab
					color='secondary'
					className={classes.action}
					onClick={() => setMode('subject')}>
					<ArrowForwardIcon />
				</Fab>
			) : null}
		</Container>
	);

	async function onUserSelected(userId) {
		let selectedUser = await User.findById(userId);
		let filteredListUsers = state.listUsers.filter(user => user.id !== userId);
		let extendedSelectedUsers = [...state.selectedUsers, selectedUser];
		setState({
			listUsers: filteredListUsers,
			selectedUsers: extendedSelectedUsers,
		});
	}
}
