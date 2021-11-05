// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQYE7DHM7dxValUuuwGQWuOjyE4NGkcuY",
  authDomain: "disney-clone-649cb.firebaseapp.com",
  projectId: "disney-clone-649cb",
  storageBucket: "disney-clone-649cb.appspot.com",
  messagingSenderId: "17941192252",
  appId: "1:17941192252:web:d7a2f49b42e3852b63ed39",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
