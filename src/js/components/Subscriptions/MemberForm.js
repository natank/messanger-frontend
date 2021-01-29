import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Grid, Button } from '@material-ui/core';

import { MainContext } from '../../Context/main-context';
import { useFormInput } from '../../Utils/customHooks';
export default function MemberForm({ memberDetails, actionText, onSubmitCb }) {
	var { membersManagementUrl } = useContext(MainContext);
	var { name, email, city } = memberDetails || {};

	var name = useFormInput(name || '');
	var email = useFormInput(email || '');
	var city = useFormInput(city || '');

	return (
		<form onSubmit={onSubmit}>
			<Grid container justify='center'>
				<Grid item xs={12} container spacing={3}>
					<Grid item xs={12}>
						<TextField fullWidth required label='Name' {...name} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth required label='Email' {...email} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth required label='City' {...city} />
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							style={{ marginRight: '1em' }}>
							{actionText}
						</Button>
						<Button component={Link} to={`${membersManagementUrl}`}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);

	function onSubmit(event) {
		event.preventDefault();
		var updatedDetails = { ...memberDetails };

		var inputs = { name, email, city };
		for (const [key, input] of Object.entries(inputs)) {
			updatedDetails[key] = input.value;
			input.onReset();
		}
		onSubmitCb(updatedDetails);
	}
}
