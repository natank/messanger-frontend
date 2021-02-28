import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../Model/user-model';

import {
	authUserReducer,
	currentConversationReducer,
	usersReducer,
	conversationsReducer,
} from '../Reducers/reducers';

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
		currentConversation: null,
		users: null,
		conversations: null,
	};
	const rootReducer = combineReducers({
		authUser: authUserReducer,
		currentConversation: currentConversationReducer,
		users: usersReducer,
		conversations: conversationsReducer,
	});

	const [state, dispatch] = useReducer(rootReducer, initialState);
	const store = useMemo(() => [state, dispatch], [state]);

	let { authUser, currentConversation } = state;
	let history = useHistory();
	useEffect(() => {
		if (authUser) {
			loadData();
			history.push('/');
		}
	}, [authUser]);

	useEffect(() => {
		if (currentConversation) history.push('/feed');
	}, [currentConversation]);
	//conversationDetails : {conversationId , withUser, participants:{name, id}}
	return (
		<MainContext.Provider value={{ store }}>
			{props.children}
		</MainContext.Provider>
	);

	async function loadData() {
		let users = await getUsers();
		dispatch({
			type: 'ADD_USERS',
			payload: users,
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
