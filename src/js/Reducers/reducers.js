export function currentConversationReducer(previousState, action) {
	switch (action.type) {
		case 'SET_CURRENT_CONVERSATION':
			return action.payload;
		case 'RESET_CURRENT_CONVERSATION':
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

export function conversationsReducer(previousState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return null;
		case 'ADD_CONVERSATIONS':
			let conversations;
			if (!previousState) {
				conversations = [...action.payload];
			} else {
				conversations = Array.isArray(action.payload)
					? [...previousState, ...action.payload]
					: [...previousState, action.payload];
			}
			return conversations;
		default:
			return previousState;
	}
}
