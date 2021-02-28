import { Container, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import FeedBody from './FeedBody';
import FeedHeader from './FeedHeader';

let useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: '1',
	},
});

export default function Feed() {
	let classes = useStyles();
	let history = useHistory();
	let { store } = useContext(MainContext);
	let [state, dispatch] = store;
	let { currentConversation } = state;
	if (!currentConversation) {
		history.push('/');
		return null;
	}
	return (
		<Container disableGutters className={classes.root}>
			<FeedHeader />
			<FeedBody />
		</Container>
	);
}
