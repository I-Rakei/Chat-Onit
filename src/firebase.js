import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJvak8G6-act8sIWhy92XXtb-u4dWiu_A",
  authDomain: "chat-66f21.firebaseapp.com",
  databaseURL:
    "https://chat-66f21-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-66f21",
  storageBucket: "chat-66f21.appspot.com",
  messagingSenderId: "1082560431593",
  appId: "1:1082560431593:web:303e4074dae3d1367cb778",
  measurementId: "G-WGPPY7J0C2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
