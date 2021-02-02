import React, {
	useReducer,
	createContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../Model/user-model';

import { authUserReducer } from '../Reducers/reducers';

export var MainContext = createContext();

export function MainContextProvider(props) {
	try {
		var sessionUser = JSON.parse(sessionStorage.getItem('user'));
	} catch (err) {
		sessionUser = undefined;
	}

	const initialState = {
		authUser: sessionUser || null,
	};
	const rootReducer = combineReducers({
		authUser: authUserReducer,
	});

	const [state, dispatch] = useReducer(rootReducer, initialState);
	const store = useMemo(() => [state, dispatch], [state]);

	let { authUser } = state;
	let [users, setUsers] = useState([]);
	let history = useHistory();

	useEffect(() => {
		if (authUser != null) loadData();
		else history.push('/');
	}, [authUser]);

	useEffect(() => {
		loadData().then(data => setUsers(data.users));
	});
	var token = localStorage.getItem('token');
	return (
		<MainContext.Provider value={{ users, store }}>
			{props.children}
		</MainContext.Provider>
	);

	async function loadData() {
		let users = await getUsers();
		return { users };
	}
}

const combineReducers = slices => (state, action) =>
	Object.keys(slices).reduce(
		(acc, prop) => ({
			...acc,
			[prop]: slices[prop](acc[prop], action),
		}),
		state
	);
