import Model from './Model';
import { createUserLogin, deleteUserLogin } from './user-login-model';

var userModel = new Model({ collectionName: 'users', docName: 'user' });

let defaultUsers = [
	{ username: 'Amit', gender: 'm', id: '1', status: 'Sleeping' },
	{ username: 'Gili', gender: 'f', id: '2', status: 'At gym' },
	{ username: 'Maya', gender: 'f', id: '3', status: 'Not available' },
	{ username: 'Dror', gender: 'm', id: '4', status: 'Happy' },
];

export async function updateUser(id, userDetails) {
	var createdDate = Date.now();
	var user = { ...userDetails, createdDate };
	return userModel.updateDoc(id, userDetails);
}

export async function createUser(newUser) {
	await createUserLogin({ userName: newUser.userName });
	return userModel.createDoc(newUser);
}

export async function deleteUser(userId) {
	await deleteUserLogin(userId);
	userModel.deleteDoc(userId);
}

export async function getUsers() {
	return defaultUsers;
}

export async function findById(userId) {
	return defaultUsers.find(user => user.id == userId);
}
