import Model from './Model';
import jsonPlaceholderDb from '../API/jsonPlaceholder';
import cinema from '../API/cinema';
import { getToken } from '../Utils/utils';

var memberModel = new Model({ collectionName: 'members', docName: 'member' });

export async function getMembers() {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'get',
			url: '/members',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
	return response.data.members;
}

export async function findById(memberId) {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'get',
			url: `/members/${memberId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
	return response.data.member;
}

export async function createMember(memberDetails) {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'post',
			url: `/members`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: memberDetails,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function updateMember(memberId, memberDetails) {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'put',
			url: `/members/${memberId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: memberDetails,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteMember(memberId) {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'delete',
			url: `/members/${memberId}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function addMemberSubscription(subscriptionDetails) {
	let token = getToken();
	try {
		var response = await cinema({
			method: 'post',
			url: `/subscriptions`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: subscriptionDetails,
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function resetMembers() {
	var originalMembers = await jsonPlaceholderDb.get('/users');

	var members = originalMembers.data.map(member => {
		return {
			city: member.address.city,
			email: member.email,
			name: member.name,
		};
	});
	memberModel.createDocs(members);
}
