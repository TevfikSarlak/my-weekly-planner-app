// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk933J2kySk-KtZstsasRv8CXwn3B4w3I",
  authDomain: "my-weekly-planner-auth.firebaseapp.com",
  projectId: "my-weekly-planner-auth",
  storageBucket: "my-weekly-planner-auth.appspot.com",
  messagingSenderId: "746794885390",
  appId: "1:746794885390:web:d584e90e0316e864b7775f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;