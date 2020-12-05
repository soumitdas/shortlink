import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_2GvkIn4tAPNWmYuMs08rhnRxZSdc1Pg",
  authDomain: "shortlink-6d74d.firebaseapp.com",
  databaseURL: "https://shortlink-6d74d.firebaseio.com",
  projectId: "shortlink-6d74d",
  storageBucket: "shortlink-6d74d.appspot.com",
  messagingSenderId: "27580940239",
  appId: "1:27580940239:web:33442f2fead5f1ba5c9cba",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
