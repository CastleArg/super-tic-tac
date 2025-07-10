
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase config is public and safe to commit
const firebaseConfig = {
  apiKey: "AIzaSyCSMjt91L_ofURaazNjlrCWFlifZ8Lpn3c",
  authDomain: "super-tic-tac.firebaseapp.com",
  databaseURL: "https://super-tic-tac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "super-tic-tac",
  storageBucket: "super-tic-tac.appspot.com",
  messagingSenderId: "634677610134",
  appId: "1:634677610134:web:559e6c6e722d03c56524b7",
  measurementId: "G-NYCYDJTE5B"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
