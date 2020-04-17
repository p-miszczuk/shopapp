import firebase from "@firebase/app";
import "@firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB22C9VWwn4gMh5RMjw82mv2fo4Mp7HABU",
  authDomain: "my-list-test.firebaseapp.com",
  databaseURL: "https://my-list-test.firebaseio.com",
  projectId: "my-list-test",
  storageBucket: "my-list-test.appspot.com",
  messagingSenderId: "927119464229",
  appId: "1:927119464229:web:f143bd7b2b40054531accc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
