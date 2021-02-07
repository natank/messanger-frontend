import messanger from '../API/messanger';

import CreateAccount from '../components/Auth/CreateAccount';
import { collectIdsAndDocs } from './utils';

export async function createAccount({
	username,
	password,
	passwordConfirmation,
	gender,
}) {
	try {
		let response = await messanger.put('/signup', {
			username,
			password,
			passwordConfirmation,
			gender,
		});
		let json = response.data.json;
		console.log(json);
	} catch (err) {
		console.log(err);
	}
}

export async function loginUser({ username, password }) {
	try {
		var response = await messanger.post('/auth/login', {
			username,
			password,
		});
	} catch (theError) {
		throw theError.response.data;
	}
	let { user, token } = response.data;
	localStorage.setItem('token', token);
	return { ...user };
}
