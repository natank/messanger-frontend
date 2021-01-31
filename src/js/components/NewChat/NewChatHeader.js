import React, { useState } from 'react';
import NewChatStartHeader from './NewChatStartHeader';
import NewChatSearchHeader from './NewChatSearchHeader';
import NewChatSubjectHeader from './NewChatSubjectHeader';

export default function NewChatHeader() {
	let [mode, setMode] = useState('start'); /*search, subject */
	switch (mode) {
		case 'start':
			return <NewChatStartHeader setMode={setMode} />;
		case 'search':
			return <NewChatSearchHeade setMode={setMode} />;
		case 'subject':
			return <NewChatSubjectHeade setMode={setMode} />;
	}
	return <div></div>;
}
