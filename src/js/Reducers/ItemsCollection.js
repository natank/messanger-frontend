export default class ItemsCollection {
	constructor(items) {
		this.items = items;
	}
	addItem(newItem) {
		this.items = [...this.items, newItem];
		return this.items;
	}

	removeItem(id) {
		return this.items.filter(item => item._id != id);
	}

	updateItem(updatedItem) {
		this.items = this.items.map((item, index) => {
			if (item._id == updatedItem._id) {
				return updatedItem;
			} else return item;
		});
		return this.items;
	}

	loadItems(items) {
		return items;
	}

	createItem() {}
}
