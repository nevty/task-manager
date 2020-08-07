import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"

export const firebaseInit = () => firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const provider = new firebase.auth.GoogleAuthProvider();