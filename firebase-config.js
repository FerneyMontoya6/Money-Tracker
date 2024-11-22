// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHgjmRKSccH-4ZiW1E5qlUSIpDA5AswAc",
  authDomain: "money-tracker-2b01f.firebaseapp.com",
  projectId: "money-tracker-2b01f",
  storageBucket: "money-tracker-2b01f.firebasestorage.app",
  messagingSenderId: "309334451456",
  appId: "1:309334451456:web:faf3c02dea77869a113fe5",
  measurementId: "G-WNHBLLNS6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporta el Auth para usarlo en otras partes
const auth = getAuth(app);

export { app, auth };
