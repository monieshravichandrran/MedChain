// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);