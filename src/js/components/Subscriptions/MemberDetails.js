import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	useMediaQuery,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import MemberSubscriptions from './MemberSubscriptions';
import SubscriptionForm from './SubscriptionForm';
import { MainContext } from '../../Context/main-context';
import { checkAccessToRoute } from '../../Utils/utils';
import { addMemberSubscription } from '../../Model/member-model';

var useStyles = makeStyles(theme => ({
	memberCard: {
		height: 350,
		width: '100%',
	},
}));

export default function MemberDetails({ member, match, cbDeleteMember }) {
	if (!member) return null;
	const history = useHistory();
	var { store, membersManagementUrl } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	var [subscriptionFormActive, setSubscriptionsFormActive] = useState(false);
	const [memberDetails, setMemberDetails] = useState({ ...member });

	const memberId = memberDetails._id;

	const editRoute = `${match.url}/edit/${memberId}`;
	const deleteRoute = `${match.url}/delete/${memberId}`;
	const isUserAllowedToDelete = checkAccessToRoute(deleteRoute, authUser);
	const isUserAllowedToEdit = checkAccessToRoute(editRoute, authUser);
	var classes = useStyles();

	var theme = useTheme();
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Card variant='outlined' className={classes.memberCard}>
			<CardContent>
				{/**Card */}
				<Grid container spacing={1} direction='column'>
					{/**Name and Email */}
					<Grid item container xs={12}>
						{/**Name */}
						<Grid item xs={12}>
							<Typography variant='h5' component='h2'>
								{memberDetails.name}
							</Typography>
						</Grid>

						{/**member email */}
						<Grid item xs={12}>
							<Button
								color='primary'
								target='_top'
								rel='noopener noreferrer'
								href={`mailto:${memberDetails.email}`}>
								<Typography
									variant='button'
									style={{ fontSize: '1em', textTransform: 'lowercase' }}>
									{memberDetails.email}
								</Typography>
							</Button>
						</Grid>
					</Grid>
					{/**Card actions, Edit, delete, subscribe */}
					<Grid item>
						<CardActions style={{ padding: 0 }}>
							{/**Edit button */}
							{isUserAllowedToEdit ? (
								<Button
									variant='outlined'
									component={Link}
									to={`${match.url}/edit/${memberDetails._id}`}
									size={matchesXS ? 'small' : 'medium'}>
									Edit
								</Button>
							) : null}
							{/**Delete button */}
							{isUserAllowedToDelete ? (
								<Button
									variant='outlined'
									onClick={onDeleteMember}
									size={matchesXS ? 'small' : 'medium'}>
									{' '}
									Delete
								</Button>
							) : null}
							{/**Sbuscribe button */}
							<Button
								variant='outlined'
								onClick={onSubscribeClick}
								size={matchesXS ? 'small' : 'medium'}>
								Subscribe
							</Button>
						</CardActions>
					</Grid>

					{subscriptionFormActive ? (
						<Grid item xs={12}>
							<SubscriptionForm
								{...{ memberDetails, onFormCancel, onSubscription }}
							/>
						</Grid>
					) : (
						<Grid item>
							<Typography component='h5' variant='h6'>
								Recent Subscriptions
							</Typography>
							<MemberSubscriptions member={memberDetails} />
						</Grid>
					)}
				</Grid>
			</CardContent>
		</Card>
	);

	function onSubscribeClick(event) {
		event.preventDefault();
		// Toggle the active flag
		setSubscriptionsFormActive(!subscriptionFormActive);
	}

	function onFormCancel(event) {
		event.preventDefault();
		setSubscriptionsFormActive(false);
	}

	async function onSubscription(subscriptionDetails) {
		const { movie, date } = subscriptionDetails;
		let newSubscription = { movie, date };

		try {
			await addMemberSubscription(newSubscription);
			var updatedMember = { ...memberDetails };
			updatedMember.subscriptions[0] = newSubscription;
			setMemberDetails(updatedMember);
			setSubscriptionsFormActive(false);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async function onDeleteMember(event) {
		event.preventDefault();
		let memberId = memberDetails._id;
		await cbDeleteMember(memberId);
	}
}
