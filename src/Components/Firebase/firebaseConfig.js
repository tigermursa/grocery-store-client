// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxpvXNmOM9d9-fmw1B5t-TgpcgIWp-SUg",
  authDomain: "grocery-store-53ee3.firebaseapp.com",
  projectId: "grocery-store-53ee3",
  storageBucket: "grocery-store-53ee3.appspot.com",
  messagingSenderId: "146835451934",
  appId: "1:146835451934:web:d2da0e78c3739e4fd4fe0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;