import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZNYeGd1Oy6-jnz2kH38uYE7L3AGThxEM",
  authDomain: "fahadfashionhub-8ea71.firebaseapp.com",
  projectId: "fahadfashionhub-8ea71",
  storageBucket: "fahadfashionhub-8ea71.appspot.com",
  messagingSenderId: "373804706157",
  appId: "1:373804706157:web:7b1cc3148f5599503ed264"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // <--- Add this
