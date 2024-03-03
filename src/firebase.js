// import firebase from 'firebase'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1kgBzooIY7cJ9XNAZqtXp8KqahumueYM",
    authDomain: "discord-cln-nk.firebaseapp.com",
    projectId: "discord-cln-nk",
    storageBucket: "discord-cln-nk.appspot.com",
    messagingSenderId: "295171277143",
    appId: "1:295171277143:web:7044fa2a5a823f0ca9fe12",
    measurementId: "G-7LK01HB31P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;

