// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5JvpDQLRmIo76YIceiu-JUcfQVQVDeek",
  authDomain: "dummyapp-427203.firebaseapp.com",
  projectId: "dummyapp-427203",
  storageBucket: "dummyapp-427203.appspot.com",
  messagingSenderId: "806402706360",
  appId: "1:806402706360:web:8143a7c83ce7c33805dd4d",
  measurementId: "G-NDL50D1G32"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const auth = getAuth();
export const db = getFirestore();
const analytics = getAnalytics(app);

export default app;