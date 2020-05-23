import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjtZFQ2ApHAYdkuVwsX18M6-yyJFyxmLI",
    authDomain: "lobo-teni.firebaseapp.com",
    databaseURL: "https://lobo-teni.firebaseio.com",
    projectId: "lobo-teni",
    storageBucket: "lobo-teni.appspot.com",
    messagingSenderId: "295462371705",
    appId: "1:295462371705:web:25c0c5db7be5470aaf6fa8",
    measurementId: "G-W5FBS72QH6"
  };


const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db   = firebase.firestore();


export const startUi = (elementId) => {
    const ui = new firebase.auth.EmailAuthProvider(auth);
    ui.start(elementId, uiConfig);
};
