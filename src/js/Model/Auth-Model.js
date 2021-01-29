import { firestore } from '../API/firebase';
import cinema from '../API/cinema';

import CreateAccount from '../components/Auth/CreateAccount';
import { collectIdsAndDocs } from './utils';

export async function createAccount({ username, password }) {
	var docRef = await firestore
		.collection('usersLogin')
		.where('userName', '==', username);
	var snapshot = await docRef.get();

	if (snapshot.empty) {
		throw 'user not found';
	} else {
		var userDoc = snapshot.docs[0];
		var data = userDoc.data();
		if (data.password) {
			throw 'user already taken';
		} else {
			await firestore
				.collection('usersLogin')
				.doc(userDoc.id)
				.update({ ...userDoc.data, password });
		}
	}
	return;
}

export async function loginUser({ username, password }) {
	try {
		var response = await cinema.post('/auth/login', {
			username,
			password,
		});
	} catch (theError) {
		console.log(`error : ${theError.errorMessage}`);
	}
	let { user, token } = response.data;
	localStorage.setItem('token', token);
	return { ...user };
}

async function getDataByUsername(username, collection) {
	var docRef = await collection.where('userName', '==', username);

	var snapshot = await docRef.get();

	if (snapshot.empty) {
		throw 'user not found';
	} else {
		return snapshot;
	}
}
