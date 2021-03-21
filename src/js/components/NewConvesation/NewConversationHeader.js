import React, { useState } from 'react';
import NewConversationStartHeader from './NewConversationStartHeader';
import NewConversationSearchHeader from './NewConversationSearchHeader';
import NewConversationSubjectHeader from './NewConversationSubjectHeader';

export default function NewConversationHeader(props) {
	const { modeProp, usersFilterProp } = props;
	const [mode, setMode] = modeProp;
	const [usersFilter, setUsersFilter] = usersFilterProp;

	switch (mode) {
		case 'start':
			return <NewConversationStartHeader setMode={setMode} />;
		case 'search':
			return (
				<NewConversationSearchHeader
					value={usersFilter}
					setValue={setUsersFilter}
					setMode={setMode}
				/>
			);
		case 'subject':
			return <NewConversationSubjectHeader setMode={setMode} />;
	}
	return <div></div>;
}
