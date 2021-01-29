import { Route } from 'react-router-dom';

export function permissionsToString(permissions) {
	let permissionsArr = [];
	let { subscriptions, movies } = permissions;

	if (subscriptions.view) permissionsArr.push('View Subscriptions');
	if (subscriptions.edit) permissionsArr.push('Edit Subscriptions');
	if (subscriptions.delete) permissionsArr.push('Delete Subscriptions');
	if (subscriptions.create) permissionsArr.push('Create Subscriptions');
	if (movies.view) permissionsArr.push('View Movies');
	if (movies.edit) permissionsArr.push('Edit Movies');
	if (movies.delete) permissionsArr.push('Delete Movies');
	if (movies.create) permissionsArr.push('Create Movies');

	return permissionsArr.toString();
}

export function compareItemId(id) {
	return function compareId(item) {
		return item.id == id;
	};
}

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
	if (!(user && user.permissions)) return false;
	if (user.permissions.isAdmin || route == '/') return true;
	/**Check access rights to the Memebers and Movies routes */
	var routePermissions = getRoutePermissions(route);
	if (!routePermissions) return false;
	var userPermissions = user.permissions;
	if (!userPermissions) return false;
	for (var collection in routePermissions) {
		for (var action in routePermissions[collection]) {
			try {
				var userPermission = userPermissions[collection][action];
			} catch (err) {
				console.log(`error for collection: ${collection} action: ${action}`);
			}
			var routePermission = routePermissions[collection][action];
			if (userPermission == false && routePermission == true) return false;
		}
	}
	return true;
}

function getRoutePermissions(route) {
	var requiredPermissions = [
		{
			route: new RegExp(`^(/subscriptions)$`),
			permissions: {
				subscriptions: {
					view: true,
				},
			},
		},
		{
			route: new RegExp(`^(/movies)$`),
			permissions: {
				movies: {
					view: true,
				},
			},
		},
		{
			route: new RegExp(`^(/movies/add)$`),
			permissions: {
				movies: {
					create: true,
				},
			},
		},
		{
			route: new RegExp(`^/movies/\w*`),
			permissions: {
				movies: {
					update: true,
				},
			},
		},
		{
			route: new RegExp(`^/movies/delete/\w*`),
			permissions: {
				movies: {
					delete: true,
				},
			},
		},
		{
			route: new RegExp(`^(/subscriptions/add)$`),
			permissions: {
				subscriptions: {
					create: true,
				},
			},
		},
		{
			route: new RegExp(`^/subscriptions/\w*`),
			permissions: {
				subscriptions: {
					update: true,
				},
			},
		},
		{
			route: new RegExp(`^/subscriptions/delete/\w*`),
			permissions: {
				subscriptions: {
					delete: true,
				},
			},
		},
	];

	var routePermissions = requiredPermissions.find(function compareRoutes(
		permission
	) {
		var result = permission.route.test(route);
		return result;
	});

	if (!routePermissions) return null;

	return routePermissions.permissions;
}
export function getToken() {
	return localStorage.getItem('token');
}
