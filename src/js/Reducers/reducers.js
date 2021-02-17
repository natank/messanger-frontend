import ItemsCollection from './ItemsCollection';

export function currentChatReducer(previousState, action) {
	switch (action.type) {
		case 'SET_CURRENT_CHAT':
			return action.payload;
		case 'RESET_CURRENT_CHAT':
			return null;
		default:
			return previousState;
	}
}

export function authUserReducer(previousState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return action.payload;
		case 'LOGOUT_USER':
			return null;
		default:
			return previousState;
	}
}

export function usersReducer(previousState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return null;
		case 'ADD_USERS':
			let users;
			if (!previousState) {
				// first user
				users = [...action.payload];
			} else {
				users = [...previousState, ...action.payload];
			}
			return users;
		default:
			return previousState;
	}
}

export function chatsReducer(previousState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return null;
		case 'ADD_CHATS':
			let chats;
			if (!previousState) {
				chats = [...action.payload];
			} else {
				chats = [...previousState, ...action.payload];
			}
			return chats;
		default:
			return previousState;
	}
}
