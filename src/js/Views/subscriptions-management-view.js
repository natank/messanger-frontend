import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MembersManagementContextProvider } from '../Context/members-management-context';
import EditMember from '../components/Subscriptions/EditMember';
import MembersNav from '../components/Subscriptions/MembersNav';
import AllMembers from '../components/Subscriptions/AllMembers';
import AddMember from '../components/Subscriptions/AddMember';
import MemberUrlWrapper from '../components/Subscriptions/MemberUrlWrapper';
import PrivateRoute from '../components/Auth/PrivateRoute';

const useStyles = makeStyles(theme => ({
	mainContainer: {
		width: '100%',
		margin: 0,
	},
	title: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
		},
	},
}));

export default function MembersManagement({ match }) {
	var classes = useStyles();
	var [navIndex, setNavIndex] = useState(0);

	return (
		<MembersManagementContextProvider match={match}>
			<Grid
				container
				direction='column'
				className={classes.mainContainer}
				alignItems='center'
				spacing={4}
				id='mainContainer'>
				<Switch>
					<Route exact path={`${match.url}/edit/:id`}>
						<Typography component='h2' variant='h2' gutterBottom>
							Members
						</Typography>
						<PrivateRoute
							{...{
								component: EditMember,
								navIndex: navIndex,
								setNavIndex: setNavIndex,
							}}
						/>
					</Route>
					<Route path={match.url}>
						<Grid item>
							<Typography component='h3' variant='h3' className={classes.title}>
								Subscriptions
							</Typography>
						</Grid>
						<Route exact path={`${match.url}`}>
							<AllMembers
								navIndex={navIndex}
								setNavIndex={setNavIndex}
								match={match}
							/>
						</Route>
						<Switch>
							<Route exact path={`${match.url}/add`}>
								<PrivateRoute
									{...{ component: AddMember }}
									navIndex={navIndex}
									setNavIndex={setNavIndex}
								/>
							</Route>
							<Route path={`${match.url}/:id`}>
								<MemberUrlWrapper
									navIndex={navIndex}
									setNavIndex={setNavIndex}
									match={match}
								/>
							</Route>
						</Switch>
					</Route>
				</Switch>
			</Grid>
		</MembersManagementContextProvider>
	);
}
