// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAn-jvjKhHD7M8JmyZzOEAGHfWPAZp479U",
    authDomain: "wedding-ef44a.firebaseapp.com",
    projectId: "wedding-ef44a",
    storageBucket: "wedding-ef44a.appspot.com",
    messagingSenderId: "478148342303",
    appId: "1:478148342303:web:78f632d40237eb3dc05b2a",
    measurementId: "G-2NZ6ZL31ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };