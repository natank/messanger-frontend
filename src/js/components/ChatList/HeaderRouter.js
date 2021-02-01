import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import ChatHeader from './ChatListHeader';
import ChatFindHeader from '../Common/ChatFindHeader';

export default function HeaderRouter() {
	let [mode, setMode] = useState('chats');
	switch (mode) {
		case 'chats':
			return <ChatHeader setMode={setMode} />;
			break;
		case 'search':
			return <ChatFindHeader setMode={setMode} prevMode='chats' />;
		case 'chats-find':
			return;
		default:
			return null;
	}
}
