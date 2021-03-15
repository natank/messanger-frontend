/**icons */
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';

/**Third party */
import { Container, Fab, Input } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

/**app components */
import Header from './NewConversationHeader';
import SelectedUsers from './SelectedUsers';
import UserList from './UserList';

/**App context */
import { MainContext } from '../../Context/main-context';

/** Utils */
import { submitNewConversation } from '../../Utils/utils';

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

export default function NewConversation() {
	/**Hooks */
	let classes = useStyles();
	let history = useHistory();

	/**Context  */
	let mainContext = useContext(MainContext);
	let { store } = mainContext;

	/**Global state */
	let [state, dispatch] = store;
	let { users, authUser } = state;

	/**Local state */
	let [selectedUsers, setSelectedUsers] = useState([]);
	let [notSelectedUsers, setNotSelectedUsers] = useState(users);
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

			<SelectedUsers selectedUsers={[...selectedUsers]} mode={mode} />

			{mode !== 'subject' ? (
				<UserList onUserSelected={onUserSelected} users={notSelectedUsers} />
			) : null}

			{/**submit group button*/}

			{selectedUsers.length > 0 && groupName.length > 0 ? (
				<Fab
					color='secondary'
					className={classes.submit}
					onClick={() => {
						submitNewConversation({ users: selectedUsers, authUser, groupName })
							.then(conversation => {
								dispatch({
									type: 'ADD_CONVERSATIONS',
									payload: conversation,
								});
								history.push('/');
							})
							.catch(err => console.log(err));
					}}>
					<CheckIcon />
				</Fab>
			) : null}

			{/**Clicking this button to continue to group subject button */}

			{selectedUsers.length > 0 && mode !== 'subject' ? (
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
		let selectedUser = undefined;
		let filteredListUsers = notSelectedUsers.filter(user => {
			if (user.id !== userId) return true;
			else {
				selectedUser = user;
				return false;
			}
		});
		let extendedSelectedUsers = [...selectedUsers, selectedUser];
		setSelectedUsers(extendedSelectedUsers);
		setNotSelectedUsers(filteredListUsers);
	}
}
