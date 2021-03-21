import { Container } from '@material-ui/core';
import React from 'react';
import SearchField from '../Common/SearchField';

export default function NewConversationSearchHeader({
	value,
	setValue,
	setMode,
}) {
	return (
		<Container>
			<SearchField setMode={setMode} value={value} setValue={setValue} />
		</Container>
	);
}
