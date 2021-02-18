import axios from 'axios';

const token = getToken();
export default axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
function getToken() {
	return sessionStorage.getItem('token');
}
