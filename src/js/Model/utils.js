export function getItems(items) {
	return getDelayedResponseArr(items, 0);
}

export function addItem(items, newItem) {
	let id = items[items.length - 1].id + 1;
	newItem.id = id;
	items = [...items, newItem];
	return getDelayedResponseArr(items, 0);
}

export function deleteItem(items, itemId) {
	var newItems = items.filter(item => item.id !== itemId);
	items.splice(0, items.length);
	newItems.forEach(item => items.push(item));
	return getDelayedResponseArr(items, 0);
}

export function updateItem(items, itemDetails) {
	items = items.filter(item => item.id !== itemDetails.id);
	items = [...items, itemDetails];
	return getDelayedResponseArr(items, 0);
}

function getDelayedResponseArr(arr, timeout) {
	return new Promise(function delayResponse(resolve, reject) {
		setTimeout(function resolveArr() {
			resolve([...arr]);
		}, timeout);
	});
}

export function collectIdsAndDocs(doc) {
	const id = doc.id;
	const data = doc.data();
	return { ...data, id };
}
