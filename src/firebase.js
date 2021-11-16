import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOsGYInIQW5Xs_FcqTHHYhvOrgz-BS1tE",
    authDomain: "githubfinder-4dc57.firebaseapp.com",
    projectId: "githubfinder-4dc57",
    storageBucket: "githubfinder-4dc57.appspot.com",
    messagingSenderId: "562330871236",
    appId: "1:562330871236:web:b26aaf7213229cf0923091"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();