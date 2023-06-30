// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMwM_rBaDXPVyIpmkVO_Syuug_YqNDVXY",
    authDomain: "note-app-53530.firebaseapp.com",
    projectId: "note-app-53530",
    storageBucket: "note-app-53530.appspot.com",
    messagingSenderId: "132450049478",
    appId: "1:132450049478:web:87ae972e8337ea3fb266c7",
    measurementId: "G-E4VTSLHMVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);