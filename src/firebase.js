import firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCz4kTS5szxmVAafcbOklZh2zsK5HXXlpY",
  authDomain: "jan-suvidha-8458a.firebaseapp.com",
  projectId: "jan-suvidha-8458a",
  storageBucket: "jan-suvidha-8458a.appspot.com",
  messagingSenderId: "479494596099",
  appId: "1:479494596099:web:71d642c51d6d827b999036",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, app };
