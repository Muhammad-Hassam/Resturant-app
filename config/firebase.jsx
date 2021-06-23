import firebase from 'firebase/app';
import  'firebase/auth';
import  'firebase/database';
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyAivtIXh36EJ_C55JQnN6WKihTmR6rcF5E",
    authDomain: "resturant-app-c7a3f.firebaseapp.com",
    projectId: "resturant-app-c7a3f",
    storageBucket: "resturant-app-c7a3f.appspot.com",
    messagingSenderId: "430382059048",
    appId: "1:430382059048:web:8e77ef9b7a9a84f187ef1d",
    measurementId: "G-R2MX3TJB2X"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database=firebase.database();
  const Storage=firebase.storage();

  export {auth,database,Storage};