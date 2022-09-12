import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpQJ-okL7TT8yHucaKmaUihvcH_rjeTEw",
    authDomain: "quizzie-d2205.firebaseapp.com",
    projectId: "quizzie-d2205",
    storageBucket: "quizzie-d2205.appspot.com",
    messagingSenderId: "1032210281141",
    appId: "1:1032210281141:web:b2dd74a57c2050eebf04fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;