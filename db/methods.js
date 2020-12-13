import { firestore } from '../config/firebase';

export async function findOneAndUpdate(collection, id, payload) {
	const ref = await firestore.collection(collection).doc(id);

	try {
		await ref.update(payload);
		console.log(`Updated document for collection: ${collection}`);
	} catch (error) {
		console.error(error);
	}
}
