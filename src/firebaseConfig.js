// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBiQBnpkjEJnvWOl7IECkL5K85yKthj8CU",
  authDomain: "medchain-3fbbe.firebaseapp.com",
  projectId: "medchain-3fbbe",
  storageBucket: "medchain-3fbbe.appspot.com",
  messagingSenderId: "495656677296",
  appId: "1:495656677296:web:ac0b23a0a9ce122461b075",
  measurementId: "G-09413PW65J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase