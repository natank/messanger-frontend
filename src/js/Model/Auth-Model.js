import messanger, { getToken } from '../API/messanger';

export async function createAccount({
	username,
	password,
	passwordConfirmation,
	gender,
	memberStatus,
}) {
	try {
		let response = await messanger.put('/signup', {
			username,
			password,
			passwordConfirmation,
			gender,
			status: memberStatus,
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
	sessionStorage.setItem('token', token);
	sessionStorage.setItem('user', JSON.stringify(user));
	getToken();
	return user;
}

export async function logoutUser() {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('user');
}
