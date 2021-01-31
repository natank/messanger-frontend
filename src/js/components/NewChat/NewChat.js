import { Container } from '@material-ui/core';
import React from 'react';
import Header from './NewChatS1Header';

export default function NewChat() {
	let [mode, setMode] = 'start'; /*search, subject */
	return (
		<Container disableGutters={true}>
			<Header mode={mode} />
		</Container>
	);

	function Users(props) {}
}
