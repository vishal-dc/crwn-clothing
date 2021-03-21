import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config =
    {
        apiKey: "AIzaSyD3YMgM5_umvl-szae0INjeLZYFv4LR-kk",
        authDomain: "crwdb-e4bb2.firebaseapp.com",
        projectId: "crwdb-e4bb2",
        storageBucket: "crwdb-e4bb2.appspot.com",
        messagingSenderId: "571627841751",
        appId: "1:571627841751:web:e25799dcab1c793ec16892"
    };


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const sigInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;