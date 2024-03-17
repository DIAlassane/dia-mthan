import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnJZ8drlyKcWsxNsUwwfKRy5zMmewu97c",
  authDomain: "dia-mthan.firebaseapp.com",
  projectId: "dia-mthan",
  storageBucket: "dia-mthan.appspot.com",
  messagingSenderId: "990627720680",
  appId: "1:990627720680:web:cccadeac3f56b8d112485d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
