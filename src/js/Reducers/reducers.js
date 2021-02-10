import ItemsCollection from './ItemsCollection';

export function currentChatReducer(previousState, action) {
	switch (action.type) {
		case 'SET_CURRENT_CHAT':
			return action.payload;
		case 'RESET_CURRENT_CHAT':
			return null;
		default:
			return null;
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
		case 'SET_USERS':
			return action.payload;
		default:
			return previousState;
	}
}
