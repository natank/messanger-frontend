/**icons */
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';

/**Third party */
import { Container, Fab, Input } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

/**app components */
import Header from './NewChatHeader';
import SelectedUsers from './SelectedUsers';
import UserList from './UserList';

/**App context */
import { MainContext } from '../../Context/main-context';

/**Models */
import * as User from '../../Model/user-model';
import * as Chat from '../../Model/chat-model';

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
	let [groupName, setGroupName] = useState('');

	return (
		<Container disableGutters={true}>
			<Header mode={mode} setMode={setMode} />
			{mode == 'subject' ? (
				<Container disableGutters={true} className={classes.input}>
					<Input
						fullWidth={true}
						placeholder='Type group subject here...'
						value={groupName}
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
					users={state.listUsers ? [...state.listUsers] : []}
				/>
			) : null}

			{/**submit group button*/}

			{state.selectedUsers.length > 0 && groupName.length > 0 ? (
				<Fab
					color='secondary'
					className={classes.submit}
					onClick={() => {
						submitNewChat()
							.then(() => history.push('/'))
							.catch(err => console.log(err));
					}}>
					<CheckIcon />
				</Fab>
			) : null}

			{/**Clicking this button to continue to group subject button */}

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
	async function submitNewChat() {
		await Chat.createChat({
			members: state.selectedUsers.map(user => user.id),
			name: groupName,
		});
	}
}
