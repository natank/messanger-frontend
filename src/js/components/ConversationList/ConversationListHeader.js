/** React dependencies */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

/**Material UI dependencies */
import { Button, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';

/**App Components */
import SearchIcon from '@material-ui/icons/Search';
import HeaderContainer from '../Common/HeaderContainer';
import { logoutUser } from '../../Model/Auth-Model';

/**App Context */
import { MainContext } from '../../Context/main-context';

let useStyles = makeStyles({
	headline: {
		display: 'flex',
		padding: '.5rem',
		justifyContent: 'space-between',
	},
});

export default function ConversationListHeader({ setMode }) {
	let classes = useStyles();
	let history = useHistory();
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;

	function handleChange(event, newValue) {}

	return (
		<HeaderContainer backgroundColor='green' color='#fff'>
			<div className={classes.headline}>
				<Typography>Messanger</Typography>
				<Button color='inherit' onClick={() => setMode('search')}>
					<SearchIcon />
				</Button>
			</div>
			<Tabs
				value={0}
				onChange={handleChange}
				aria-label='conversation header tabs'>
				<Tab
					label='Conversations'
					{...{ id: 'conversation', 'aria-controls': 'tabpanel 2' }}
					value={0}></Tab>
				<Tab
					label='New Conversation'
					onClick={() => history.push('/new')}
					{...{ id: 'newConversation', 'aria-controls': 'tabpanel 1' }}></Tab>
				<Tab
					label='Logout'
					onClick={() => {
						logoutUser();
						history.push('/login');
						dispatch({
							type: 'LOGOUT_USER',
						});
					}}
					{...{ id: 'logout', 'aria-controls': 'tabpanel 3' }}></Tab>
			</Tabs>
		</HeaderContainer>
	);
}
