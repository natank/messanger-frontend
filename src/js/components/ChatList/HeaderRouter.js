import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import ChatHeader from './ChatListHeader';
import ChatFind from './ChatFindHeader';

export default function HeaderRouter() {
	let [mode, setMode] = useState('chats');
	switch (mode) {
		case 'chats':
			return <ChatHeader setMode={setMode} />;
			break;
		case 'search':
			return <ChatFind setMode={setMode} />;
		case 'chats-find':
			return;
		default:
			return null;
	}
}
