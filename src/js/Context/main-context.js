import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../Model/user-model';
import { getChats } from '../Model/chat-model';

import {
	authUserReducer,
	currentChatReducer,
	usersReducer,
	chatsReducer,
} from '../Reducers/reducers';
import { loginUser } from '../Model/Auth-Model';

export var MainContext = createContext();

const defaultChatDetails = {
	chatId: '123',
	chatName: 'JR Devs',
	latestMessage: { username: 'Gal', text: 'Hi there Group' },
	participants: [
		{ username: 'Dalit', userId: '123' },
		{ username: 'Gil', userId: '776' },
		{ username: 'Tali', userId: '734' },
	],
}; // Group chat

export function MainContextProvider(props) {
	let user = JSON.parse(sessionStorage.getItem('user'));
	const initialState = {
		authUser: user,
		currentChat: null,
		users: null,
		chats: null,
	};
	const rootReducer = combineReducers({
		authUser: authUserReducer,
		currentChat: currentChatReducer,
		users: usersReducer,
		chats: chatsReducer,
	});

	const [state, dispatch] = useReducer(rootReducer, initialState);
	const store = useMemo(() => [state, dispatch], [state]);

	let { authUser } = state;
	let history = useHistory();
	useEffect(() => {
		if (authUser) {
			loadData();
			history.push('/');
		}
	}, [authUser]);

	//chatDetails : {chatId , withUser, participants:{name, id}}
	return (
		<MainContext.Provider value={{ store }}>
			{props.children}
		</MainContext.Provider>
	);

	async function loadData() {
		let users = await getUsers();
		let chats = await getChats();
		dispatch({
			type: 'ADD_USERS',
			payload: users,
		});
		dispatch({
			type: 'ADD_CHATS',
			payload: chats,
		});
	}
}

const combineReducers = slices => (state, action) =>
	Object.keys(slices).reduce(
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);
