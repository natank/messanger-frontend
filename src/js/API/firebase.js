import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyA6lkTqpAYvfawAgv4CGp_jwLBM-AdjwNc",
  authDomain: "movie-subscription-267c8.firebaseapp.com",
  databaseURL: "https://movie-subscription-267c8.firebaseio.com",
  projectId: "movie-subscription-267c8",
  storageBucket: "movie-subscription-267c8.appspot.com",
  messagingSenderId: "10941552160",
  appId: "1:10941552160:web:bf8859fa12b5a37356ce45",
  measurementId: "G-R6MMR498HP"
};
// Initialize Firebase
firebase.initializeApp(config);

window.firebase = firebase;
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider;
// export const signInWithGoogle = auth.signInWithPopup(provider);
export default firebase;