import {
	Button,
	makeStyles,
	Typography,
} from '@material-ui/core';

import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContainer from '../Common/HeaderContainer';
import { ArrowBack } from '@material-ui/icons';
import { Avatar, Container } from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import groupAvatar from '../../../images/group.png';

let useStyles = makeStyles({

	root: {
		display: 'flex',
		padding: '.5rem',
		justifyContent: 'space-between',
		backgroundColor: 'green',
		color:'#fff'
	},
});

export default function FeedHeader({ setMode }) {
	let classes = useStyles();
	let history = useHistory();


	function handleChange(event, newValue) {}

	return (
		<Container disableGutters className={classes.root}>
			
			<Button color='inherit'>
				<ArrowBack onClick={() => history.push('/')} />
			</Button>
			<Avatar alt='woman avatar' src={womanAvatar} />
			<Container>
				<Typography variant="subtitle1">Gali</Typography>
				<Typography variant="subtitle2">Amit, Sarit</Typography>
			</Container>
			
		</Container>
	);
}
