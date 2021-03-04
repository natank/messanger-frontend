/**Utils */
import { getToken } from '../Utils/utils';
/**Data access */
import messanger from '../API/messanger';

let defaultMessages = [
	{ messageText: 'Hi There', authorName: 'Sagi' },
	{ messageText: 'Hi There', authorName: 'Sagi' },
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
	{
		messageText: 'Hi Thersadasdafdsa fsafdfsdafdssdfafsdfsd sfadfsdafsdafse',
		authorName: 'Sagi',
	},
];

let defaultChats = [
	{
		chatId: '123',
		chatName: 'JR Devs',
		latestMessage: { username: 'Gal', text: 'Hi there Group' },
		participants: [
			{ username: 'Dalit', userId: '123' },
			{ username: 'Gil', userId: '776' },
			{ username: 'Tali', userId: '734' },
		],
	}, // Group chat
	{
		chatId: '456',
		withUser: { userId: 'abc', gender: 'm', username: 'Dan' },
		latestMessage: {
			username: 'Amit',
			text: 'Welcome to the club, Private chat',
		},
	}, // Private
	{
		chatId: undefined,
		withUser: { userId: 'defgeddd', gender: 'm', username: 'Ben' },
	}, // Private, no chats yet
];

/**Get all the conversation user participated in */
export async function getConversations({ userId, filter }) {
	try {
		var response = await messanger.get(`/users/conversations`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			params: {
				filter,
				userId,
			},
		});
		var conversations = response.data;
	} catch (error) {
		throw error;
	}
	return conversations;
}

export async function getConversation(props) {
	let { conversationId, userId, withUserId } = props;
	// conversation already exist
	if (conversationId) {
	} else {
		// conversation doesn't exsist
		// create new private conversation between userId and withUserId
	}

	return [
		{ text: 'hello', user: 'Gil', userId: '123' },
		{ text: 'hi', user: 'Dana', userId: '456' },
		{ text: 'hi', user: 'Gil', userId: '123' },
	];
}

export async function getConversationMessages(conversationDetails, authUser) {
	//chatDetails : {chatId , withUser}
	const { _id: conversationId, withUSer } = conversationDetails;
	if (conversationId) {
		/*get the chat messages from the db*/
		try {
			const response = await messanger.get(`/conversations/${conversationId}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				}
			});
			console.log(response)
			return response.data.conversation.messages;
		} catch (error) {
			throw(error)
		}
	} else {
		/* get the messages between the current user and withUser*/
	}
	return defaultMessages;
}

export async function addMessage(props) {
	let { message, chatId, fromUserId, toUserId } = props;
	return;
}

export async function createConversation({ members, name }) {
	members = members.map(member => member.id);
	let response = await messanger.post(
		'/conversations',
		{ members, name },
		{
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		}
	);
	return response;
}
