import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCS-x6-4j7nx69aQ-2hGTwlzmpdbRarSVA",
  authDomain: "ecommerce-ecom-93300.firebaseapp.com",
  projectId: "ecommerce-ecom-93300",
  storageBucket: "ecommerce-ecom-93300.appspot.com",
  messagingSenderId: "219434805554",
  appId: "1:219434805554:web:79ce24863fd15cd23d0f2b",
  measurementId: "G-J1BBTLJMPV"
};

firebase.initializeApp(firebaseConfig);
const  auth=firebase.auth();
const fs=firebase.firestore();
const storage=firebase.storage();
export {auth,fs,storage}
