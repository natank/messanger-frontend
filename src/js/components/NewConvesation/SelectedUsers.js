import React from 'react';
import {
	List,
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Container,
} from '@material-ui/core';
import womanAvatar from '../../../images/woman.png';
import manAvatar from '../../../images/man.png';
import { makeStyles } from '@material-ui/styles';
import { Fragment } from 'react';

let useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex',
	},
	listItem: {
		display: 'flex',
		flexDirection: 'column',
	},
	avatar: {
		margin: 'auto',
	},
});

export default function SelectedUsers({
	selectedUsers,
	setSelectedUsers,
	mode,
}) {
	let classes = useStyles();
	return selectedUsers.length == 0 ? null : (
		<Container disableGutters={true}>
			{mode == 'subject' ? (
				<Typography component='h6' variant='h6'>
					Participants: {selectedUsers.length}
				</Typography>
			) : null}
			<List className={classes.root}>
				{selectedUsers.map(user => {
					return (
						<ListItem key={user._id} className={classes.listItem}>
							<ListItemAvatar>
								<Avatar
									className={classes.avatar}
									alt={user.gender == 'male' ? 'male avatar' : 'female avatar'}
									src={user.gender == 'male' ? manAvatar : womanAvatar}
								/>
							</ListItemAvatar>
							<Typography variant='body1'>{user.username}</Typography>
						</ListItem>
					);
				})}
			</List>
		</Container>
	);
}
