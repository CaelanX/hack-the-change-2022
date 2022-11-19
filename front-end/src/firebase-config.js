// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: "unicred2-e24eb.appspot.com",
// 	messagingSenderId: "827325065548",
// 	appId: process.env.REACT_APP_API_ID,
// 	measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: "unicred2-e24eb",
	storageBucket: "unicred2-e24eb.appspot.com",
	messagingSenderId: "827325065548",
	appId: process.env.REACT_APP_APP_ID,
	measurementId: "G-0TTS6D2EZ1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
