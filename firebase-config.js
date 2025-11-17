// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAuU-GLuR8Ehm2YgyfWmdkJdmim_xcEF4",
    authDomain: "africana-ultimate-solution.firebaseapp.com",
    projectId: "africana-ultimate-solution",
    storageBucket: "africana-ultimate-solution.firebasestorage.app",
    messagingSenderId: "708518879022",
    appId: "1:708518879022:web:14d0da2cb031c5fff1a4bf",
    measurementId: "G-3DVDXYW3PB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

