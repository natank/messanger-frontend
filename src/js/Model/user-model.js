let defaultUsers = [
	{ username: 'Amit', gender: 'm', id: '1', status: 'Sleeping' },
	{ username: 'Gili', gender: 'f', id: '2', status: 'At gym' },
	{ username: 'Maya', gender: 'f', id: '3', status: 'Not available' },
	{ username: 'Dror', gender: 'm', id: '4', status: 'Happy' },
];

export async function createUser(newUser) {}

export async function getUsers() {
	return defaultUsers;
}

export async function findById(userId) {
	return defaultUsers.find(user => user.id == userId);
}
