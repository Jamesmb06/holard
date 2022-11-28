// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlqFJ8rfeypGmj0yyzuCAZ6UF-IaVhb5E",
  authDomain: "food-delivery-8533f.firebaseapp.com",
  projectId: "food-delivery-8533f",
  storageBucket: "food-delivery-8533f.appspot.com",
  messagingSenderId: "604065940224",
  appId: "1:604065940224:web:a35cfc37dabe52b782e9e5",
  measurementId: "G-QT51S58MDV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dataBase = getFirestore(app);
// const analytics = getAnalytics(app);