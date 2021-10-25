// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKoPeJ2wjBPaFGA7F9IrRZPwETGIRu-vY",
  authDomain: "rovot-b277d.firebaseapp.com",
  databaseURL: "https://rovot-b277d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rovot-b277d",
  storageBucket: "rovot-b277d.appspot.com",
  messagingSenderId: "521409660142",
  appId: "1:521409660142:web:2325726c2629d971331fff",
  measurementId: "G-QFL7LG0MNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;