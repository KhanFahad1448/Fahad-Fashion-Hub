import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDzDz1sDy1GZVykhWO43uocV_6WdMmyv64",
  authDomain: "fahad-fashion-hub.firebaseapp.com",
  projectId: "fahad-fashion-hub",
  storageBucket: "fahad-fashion-hub.firebasestorage.app",
  messagingSenderId: "664214524471",
  appId: "1:664214524471:web:00ac2451831e614958e5b2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // <--- Add this
