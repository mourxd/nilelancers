// Firebase Configuration for NileLancers
// API keys for Firebase web apps are meant to be public
// Security is controlled by Firebase Security Rules, not by hiding the API key

const firebaseConfig = {
    apiKey: "AIzaSyAjHkMbZs2Cb3_H9Dv0LzK30Llr06TT9lU",
    authDomain: "nilelancers-53954.firebaseapp.com",
    projectId: "nilelancers-53954",
    storageBucket: "nilelancers-53954.firebasestorage.app",
    messagingSenderId: "857933274817",
    appId: "1:857933274817:web:87503c6d34ff0117a0be40",
    measurementId: "G-G403CY6N89"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log('Firebase initialized successfully!');
