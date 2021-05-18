import { createSlice } from '@reduxjs/toolkit';

export const currentConversationSlice = createSlice({
	name: 'currentConversation',
	initialState: null,
	reducers: {
		update: (currentConversation, action) => {
			return { ...action.payload };
		},
		reset: () => {
			return null;
		},
		addMessage: (currentConversation, action) => {
			if (action.payload.conversationId == currentConversation.id) {
				currentConversation.messages = [
					...currentConversation.messages,
					{ author: action.payload.author, text: action.payload.text },
				];
			}
		},
	},
});

export const { update, reset, addMessage } = currentConversationSlice.actions;

export default currentConversationSlice.reducer;
