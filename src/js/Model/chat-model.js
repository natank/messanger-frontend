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

export async function getChats(props) {
	return defaultChats
}

export async function getChat(props) {
	let { chatId, userId, withUserId } = props;
	// chat already exist
	if (chatId) {
	} else {
		// chat doesn't exsist
		// create new private chat between userId and withUserId
	}

	return [
		{ text: 'hello', user: 'Gil', userId: '123' },
		{ text: 'hi', user: 'Dana', userId: '456' },
		{ text: 'hi', user: 'Gil', userId: '123' },
	];
}

export async function getChatMessages(chatDetails, authUser) {
	//chatDetails : {chatId , withUser}
	// let { chatId, withUSer } = chatDetails;
	// if (chatId) {
	// 	/*get the chat messages from the db*/
	// } else {
	// 	/* get the messages between the current user and withUser*/
	// }
	return defaultMessages;
}

export async function addMessage(props) {
	let { message, chatId, fromUserId, toUserId } = props;
	return;
}

export async function createChat({ members, name }) {
	members = members.map(member => member.id);
	messanger.post('/chat', { members, name });
}
