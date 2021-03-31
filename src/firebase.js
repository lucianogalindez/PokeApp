import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA_N_HgmnONPGYhLQoCNcdkmjLmEdge4Io",
    authDomain: "curso-programate.firebaseapp.com",
    projectId: "curso-programate",
    storageBucket: "curso-programate.appspot.com",
    messagingSenderId: "338516466982",
    appId: "1:338516466982:web:83b43116c44293a235f5e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, db, storage, firebase}