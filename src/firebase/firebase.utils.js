import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData

            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);

    });

    return await batch.commit();
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const sigInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;