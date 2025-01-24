// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_DEreKKP3t003x7PyzIAXKYfGhN-oz9w",
  authDomain: "journalapp-ded24.firebaseapp.com",
  projectId: "journalapp-ded24",
  storageBucket: "journalapp-ded24.appspot.com",
  messagingSenderId: "536027663693",
  appId: "1:536027663693:web:0dc5206eb3ef772e6cfb04"
};

// Initialize Firebase
export const firebseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebseApp);
export const firebaseDB = getFirestore(firebseApp);