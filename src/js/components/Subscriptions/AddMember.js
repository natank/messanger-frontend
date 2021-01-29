import React, { useContext } from 'react';
import { Typography, Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MembersNav from './MembersNav';
import MemberForm from './MemberForm';
import { MainContext } from '../../Context/main-context';
import { createMember } from '../../Model/member-model';

var useStyles = makeStyles(theme => ({
	formTitle: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
	},
	navContainer: {
		[theme.breakpoints.down('sm')]: {
			paddingLeft: 0,
			paddingRight: 0,
		},
	},
}));

export default function AddMember({ navIndex, setNavIndex }) {
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var classes = useStyles();
	const theme = useTheme();
	var matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<Grid
			item
			container
			direction='column'
			xs={12}
			md={6}
			spacing={6}
			id='addMembersContainer'>
			<Grid
				item
				xs={12}
				container
				alignItems='center'
				justify='center'
				className={classes.navContainer}
				style={{
					paddingLeft: matchesSM ? 0 : 24,
					paddingRight: matchesSM ? 0 : 24,
				}}
				id='navContainer'>
				<MembersNav navIndex={navIndex} setNavIndex={setNavIndex} />
			</Grid>
			<Grid item>
				<Typography variant='h4' align='center' className={classes.formTitle}>
					Add New Member
				</Typography>
				<MemberForm
					actionText='Create'
					onSubmitCb={onCreateMember}
					navIndex={navIndex}
					setNavIndex={setNavIndex}
				/>
			</Grid>
		</Grid>
	);

	async function onCreateMember(memberDetails) {
		var details = { ...memberDetails, movies: [] };
		try {
			await createMember(details);
		} catch (error) {
			console.log(error);
			throw error;
		}
		dispatch({
			type: 'ADD_MEMBER',
			payload: { member: { ...memberDetails } },
		});
	}
}
