// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7qjew0udGi2b3wD293945kpNIYHcVSpQ",
  authDomain: "snake-game-portafolio.firebaseapp.com",
  databaseURL: "https://snake-game-portafolio-default-rtdb.firebaseio.com",
  projectId: "snake-game-portafolio",
  storageBucket: "snake-game-portafolio.appspot.com",
  messagingSenderId: "422828052602",
  appId: "1:422828052602:web:c68580494670d219a8abc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);