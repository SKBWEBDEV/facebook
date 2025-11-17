// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG-kunxjAY6aG_dQoIgY5bJwJLypBTGKs",
  authDomain: "post-63744.firebaseapp.com",
  databaseURL: "https://post-63744-default-rtdb.firebaseio.com",
  projectId: "post-63744",
  storageBucket: "post-63744.firebasestorage.app",
  messagingSenderId: "223663340404",
  appId: "1:223663340404:web:4c6f3ecf0f8bf626b4ca21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig