import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MainContext } from '../../Context/main-context';
import * as Member from '../../Model/member-model';
import MemberForm from './MemberForm';
import { updateMember } from '../../Model/member-model';

var useStyles = makeStyles(theme => ({
	title: {
		marginBottom: '1em',
	},
}));

export default function EditMember({ navIndex, setNavIndex }) {
	const { store, membersManagementUrl } = useContext(MainContext);
	const match = useRouteMatch();
	const memberId = match.params.id;

	var [state, dispatch] = store;

	let [editedMember, setEditedMember] = useState(null);
	let [componentState, setComponentState] = useState({
		redirect: false,
		updatedMemberDetails: {},
	});

	var history = useHistory();

	useEffect(() => {
		async function getData() {
			try {
				let member = await Member.findById(memberId);
				setEditedMember(member);
			} catch (err) {
				console.log(err);
				throw err;
			}
		}
		if (!editedMember) getData();
	}, []);

	var classes = useStyles();
	return (
		<div>
			{editedMember ? (
				<div>
					<Typography variant='h5' className={classes.title} align='center'>
						Edit Member: {`${editedMember.name}`}
					</Typography>

					{editedMember ? (
						<MemberForm
							memberDetails={editedMember}
							actionText='Update'
							onSubmitCb={onUpdateMember}
							navIndex={navIndex}
							setNavIndex={setNavIndex}
						/>
					) : null}
				</div>
			) : (
				<div>{null}</div>
			)}
		</div>
	);

	async function onUpdateMember(memberDetails) {
		var details = { ...memberDetails };

		try {
			await updateMember(memberId, details);
			dispatch({ type: 'UPDATE_MEMBER', payload: { member: details } });
			history.push(membersManagementUrl);
		} catch (error) {
			console.log(error);
			alert('something went wrong, please try later');
		}
	}
}
