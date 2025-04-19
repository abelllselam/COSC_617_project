import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvuu5pGNYmVwv0JaMihIZabipGuhuvfys",
  authDomain: "tu-video-app.firebaseapp.com",
  projectId: "tu-video-app",
  storageBucket: "tu-video-app.firebasestorage.app",
  messagingSenderId: "614221841789",
  appId: "1:614221841789:web:6880786ee73c8a5a74f814",
  measurementId: "G-QVN6C5YJYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const auth = getAuth(app);
