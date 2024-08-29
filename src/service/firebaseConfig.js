
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAuI8O1xLCVU7cdlWu6Hpoph7BKz8mUZLk",
  authDomain: "ai-trip-planner-f69e6.firebaseapp.com",
  projectId: "ai-trip-planner-f69e6",
  storageBucket: "ai-trip-planner-f69e6.appspot.com",
  messagingSenderId: "68981534342",
  appId: "1:68981534342:web:4362ecb81d38e784e12b07",
  measurementId: "G-E54PFRR0N9"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
