import React, { useState } from 'react';
import NewChatStartHeader from './NewChatStartHeader';
import ChatFindHeader from '../Common/ChatFindHeader';
import NewChatSubjectHeader from './NewChatSubjectHeader';

export default function NewChatHeader({ mode, setMode }) {
	switch (mode) {
		case 'start':
			return <NewChatStartHeader setMode={setMode} />;
		case 'search':
			return <ChatFindHeader setMode={setMode} prevMode={'start'} />;
		case 'subject':
			return <NewChatSubjectHeader setMode={setMode} />;
	}
	return <div></div>;
}
