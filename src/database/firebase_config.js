import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};
let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app();
}
export default Firebase;
