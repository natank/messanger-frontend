import { firestore } from '../API/firebase';
import { collectIdsAndDocs } from './utils';

export default class Model {
	constructor({ collectionName, docName }) {
		this.collectionName = collectionName;
		this.docName = docName;
		this.collection = firestore.collection(collectionName);
	}

	async getCollectionDocs() {
		var snapshot = await this.collection.get();
		var docs = snapshot.docs.map(collectIdsAndDocs);
		return docs;
	}

	async createDoc(docDetails) {
		var docRef = await this.collection.add(docDetails);
		const doc = await docRef.get();
		return collectIdsAndDocs(doc);
	}

	async deleteDoc(id) {
		await this.collection.doc(id).delete();
	}

	async updateDoc(docId, docDetails) {
		if (!docId) throw new Error(`Update ${this.docName} failed: missing id`);
		await this.collection.doc(docId).update({
			...docDetails,
		});

		var doc = await this.collection.doc(docId).get();
		var item = collectIdsAndDocs(doc);
		return item;
	}

	async createDocs(docs) {
		var batch = firestore.batch();

		docs.forEach(doc => {
			var docRef = this.collection.doc();
			batch.set(docRef, doc);
		});
		batch.commit();
	}
}
