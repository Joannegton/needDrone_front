// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE,
  authDomain: "needdrone-d9de4.firebaseapp.com",
  projectId: "needdrone-d9de4",
  storageBucket: "needdrone-d9de4.appspot.com",
  messagingSenderId: "752991009030",
  appId: "1:752991009030:web:45bbea7fe26f7d644e8687",
  measurementId: "G-QQ385WGZDD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const databaseApp = getFirestore(app)