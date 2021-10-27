import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLEtKtDy7hunPtyos_8hPtap6uhxyST68",
  authDomain: "rovot-61287.firebaseapp.com",
  projectId: "rovot-61287",
  storageBucket: "rovot-61287.appspot.com",
  messagingSenderId: "1085471321937",
  appId: "1:1085471321937:web:c753d651f43844e0716d70",
  measurementId: "G-3KJ7RYCJQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
export default db;