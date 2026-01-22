// Firebase Configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjHkMbZs2Cb3_H9Dv0LzK30Llr06TT9lU",
    authDomain: "nilelancers-53954.firebaseapp.com",
    projectId: "nilelancers-53954",
    storageBucket: "nilelancers-53954.firebasestorage.app",
    messagingSenderId: "857933274817",
    appId: "1:857933274817:web:4be68ba97fae2b7aa0be40",
    measurementId: "G-0YYWDRHVC3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log('Firebase initialized successfully');
