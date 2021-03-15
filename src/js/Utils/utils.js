import * as Conversation from '../Model/conversation-model';

export function today() {
	let d = new Date();
	let currDate = d.getDate();
	let currMonth = d.getMonth() + 1;
	let currYear = d.getFullYear();
	return (
		currYear +
		'-' +
		(currMonth < 10 ? '0' + currMonth : currMonth) +
		'-' +
		(currDate < 10 ? '0' + currDate : currDate)
	);
}

export async function submitNewConversation({ users, authUser, groupName }) {
	const conversation = {
		members: [...users, authUser],
		name: groupName,
	};
	try {
		await Conversation.createConversation(conversation);
	} catch (error) {
		console.log(error);
	}
	return conversation;
}
