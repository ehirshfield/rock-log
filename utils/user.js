import users from '../data/user.json';

export async function getCurrentUser() {
	return users[0];
}
