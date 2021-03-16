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

export async function submitNewConversation({ members, authUser, groupName }) {
	const conversationDetails = {
		members: [...members, authUser],
		name: groupName,
	};
	try {
		const conversation = await Conversation.createConversation(
			conversationDetails
		);
		return conversation;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
