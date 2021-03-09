import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCo8W6shjJEyF9gC0yWr3XLSNFmT5G-NFk",
  authDomain: "crwn-clothing-db-4e404.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-4e404-default-rtdb.firebaseio.com",
  projectId: "crwn-clothing-db-4e404",
  storageBucket: "crwn-clothing-db-4e404.appspot.com",
  messagingSenderId: "2316742908",
  appId: "1:2316742908:web:adbc32cea29794e80c6779",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
