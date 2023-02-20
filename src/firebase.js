// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZdwglGY_HCphVohs0koWwudBpUYE7ors",
    authDomain: "stockincontrol-94121.firebaseapp.com",
    projectId: "stockincontrol-94121",
    storageBucket: "stockincontrol-94121.appspot.com",
    messagingSenderId: "651642369896",
    appId: "1:651642369896:web:47a8d634f3bc13f607c8dd",
    measurementId: "G-CNHD9EYYTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
