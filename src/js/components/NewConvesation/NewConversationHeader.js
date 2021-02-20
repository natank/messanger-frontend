import React, { useState } from 'react';
import NewConversationStartHeader from './NewConversationStartHeader';
import ConversationFindHeader from '../Common/ConversationFindHeader';
import NewConversationSubjectHeader from './NewConversationSubjectHeader';

export default function NewConversationHeader({ mode, setMode }) {
	switch (mode) {
		case 'start':
			return <NewConversationStartHeader setMode={setMode} />;
		case 'search':
			return <ConversationFindHeader setMode={setMode} prevMode={'start'} />;
		case 'subject':
			return <NewConversationSubjectHeader setMode={setMode} />;
	}
	return <div></div>;
}
