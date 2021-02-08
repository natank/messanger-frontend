import { Route } from 'react-router-dom';

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

export function checkAccessToRoute(route, user) {
	if (!(user)) return false;
	return true;
}

export function getToken() {
	return localStorage.getItem('token');
}
