// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIfxl4LudWkIfhHu9QYLy2bnllOd6BPmY",
  authDomain: "react-app-d34e5.firebaseapp.com",
  projectId: "react-app-d34e5",
  storageBucket: "react-app-d34e5.appspot.com",
  messagingSenderId: "760697112956",
  appId: "1:760697112956:web:e6bc837d67622c3dd47cf9",
  measurementId: "G-VZ3L159RSQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {db,auth,firebase}