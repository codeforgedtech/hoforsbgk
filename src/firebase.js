import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB29EH_l_ymSogXqmFhbTTyQ9d7QkP1mok",
  authDomain: "hoforsbgk.firebaseapp.com",
  projectId: "hoforsbgk",
  storageBucket: "hoforsbgk.appspot.com",
  messagingSenderId: "705042181408",
  appId: "1:705042181408:web:3a2287d1864ab58d9f3b45",
  measurementId: "G-4T2GNG52L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };