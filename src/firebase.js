// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR_xydPvdbWtNnZMdbmH2Ncn-C45wKnM4",
  authDomain: "chat-c5619.firebaseapp.com",
  projectId: "chat-c5619",
  storageBucket: "chat-c5619.appspot.com",
  messagingSenderId: "783379229261",
  appId: "1:783379229261:web:e84d8fdd437e57fdc0ca04",
  measurementId: "G-MCBEDXCKCW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();  //to authenicate
export const storage = getStorage();  // to uplaod image
export const db = getFirestore();