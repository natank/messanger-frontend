import axios from 'axios';

let token;

export default axios.create({
	baseURL: 'http://localhost:8080',
});
export function getToken() {
	return sessionStorage.getItem('token');
}
