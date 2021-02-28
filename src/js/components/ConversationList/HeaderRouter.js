import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import ConversationHeader from './ConversationListHeader';
import ConversationFindHeader from '../Common/ConversationFindHeader';

export default function HeaderRouter({ onFilterChanged }) {
	let [mode, setMode] = useState('conversations');
	switch (mode) {
		case 'conversations':
			return <ConversationHeader setMode={setMode} />;
			break;
		case 'search':
			return (
				<ConversationFindHeader
					setMode={setMode}
					onFilterChanged={onFilterChanged}
					prevMode='conversations'
				/>
			);
		case 'conversations-find':
			return;
		default:
			return null;
	}
}
