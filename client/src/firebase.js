// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'meverickestate.firebaseapp.com',
	projectId: 'meverickestate',
	storageBucket: 'meverickestate.appspot.com',
	messagingSenderId: '967220514409',
	appId: '1:967220514409:web:7d4a64820fbf7afd129cf8',
	measurementId: 'G-PT5RJNVTSJ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
