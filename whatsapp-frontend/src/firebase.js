import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB_RsCayYWGWuyLcvZBWqulDGw-xoushkc",
  authDomain: "whatsapp-clone-9deab.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-9deab.firebaseio.com",
  projectId: "whatsapp-clone-9deab",
  storageBucket: "whatsapp-clone-9deab.appspot.com",
  messagingSenderId: "503415738416",
  appId: "1:503415738416:web:7f7e806c15a2cc512fddf5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { auth, provider };
export default db;
