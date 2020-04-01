import initFirebase from 'firebase/app';
import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID
} from 'react-native-dotenv';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
};

// Initialize Firebase
if (!initFirebase.apps.length) {
	initFirebase.initializeApp(firebaseConfig);
}
// firebase.analytics();

export const firestore = initFirebase.firestore();
export const firebase = initFirebase.app();
