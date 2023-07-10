
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk933J2kySk-KtZstsasRv8CXwn3B4w3I",
  authDomain: "my-weekly-planner-auth.firebaseapp.com",
  projectId: "my-weekly-planner-auth",
  storageBucket: "my-weekly-planner-auth.appspot.com",
  messagingSenderId: "746794885390",
  appId: "1:746794885390:web:d584e90e0316e864b7775f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export default app;