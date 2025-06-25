// src/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore service

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf0SR1iIRgQ0iP_U6frEbfcVHrYAwF6GI",
  authDomain: "personal-portfolio-abf49.firebaseapp.com",
  projectId: "personal-portfolio-abf49",
  storageBucket: "personal-portfolio-abf49.firebasestorage.app",
  messagingSenderId: "387657432841",
  appId: "1:387657432841:web:9b3f041c912388d9331dd8",
  measurementId: "G-8QQWDZN87X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // You can keep analytics if you need it

// Initialize Firestore and export it
export const db = getFirestore(app);

// You can export app if needed, but for specific services, exporting them directly is often more convenient.
export default app;