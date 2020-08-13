import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB96hDmgLK4C9Uys_mDvGoqiOaMVytS_rY",
  authDomain: "evernote-clone-999.firebaseapp.com",
  databaseURL: "https://evernote-clone-999.firebaseio.com",
  projectId: "evernote-clone-999",
  storageBucket: "evernote-clone-999.appspot.com",
  messagingSenderId: "594625937859",
  appId: "1:594625937859:web:0f9608ce21d42388befd76",
  measurementId: "G-NPG77325N9",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("evernote-container")
);
