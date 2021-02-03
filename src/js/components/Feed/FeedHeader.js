import {
	Button,
	Container,
	makeStyles,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContainer from '../Common/HeaderContainer';

let useStyles = makeStyles({
	headline: {
		display: 'flex',
		padding: '.5rem',
		justifyContent: 'space-between',
	},
});

export default function FeedHeader({ setMode }) {
	let classes = useStyles();
	let history = useHistory();

	function handleChange(event, newValue) {}

	return (
		<HeaderContainer backgroundColor='green' color='#fff'>
			<div className={classes.headline}>
				<Typography>Messanger</Typography>
				<Button color='inherit' onClick={() => setMode('search')}>
					<SearchIcon />
				</Button>
			</div>
			<Tabs value={0} onChange={handleChange} aria-label='chat header tabs'>
				<Tab
					label='Chats'
					{...{ id: 'chat', 'aria-controls': 'tabpanel 2' }}
					value={0}></Tab>
				<Tab
					label='New Chat'
					onClick={() => history.push('/new')}
					{...{ id: 'newChat', 'aria-controls': 'tabpanel 1' }}></Tab>
				<Tab
					label='Logout'
					{...{ id: 'logout', 'aria-controls': 'tabpanel 3' }}></Tab>
			</Tabs>
		</HeaderContainer>
	);
}
