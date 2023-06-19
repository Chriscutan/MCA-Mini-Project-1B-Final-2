import { initializeApp, getApp, getApps } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxWGxSnqEPLDCk9HYo96SKIqG-eKik0vE",
  authDomain: "mini-project-1b.firebaseapp.com",
  projectId: "mini-project-1b",
  storageBucket: "mini-project-1b.appspot.com",
  messagingSenderId: "77439364062",
  appId: "1:77439364062:web:c9e99490f4718587ec0b4f",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
