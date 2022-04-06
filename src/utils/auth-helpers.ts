import { getAuth } from "firebase/auth";
import constants from "../constants";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeBn2HQyh_FiQUK42praQbCHvCJvgBsrI",
  authDomain: "what-ales-you-auth.firebaseapp.com",
  projectId: "what-ales-you-auth",
  storageBucket: "what-ales-you-auth.appspot.com",
  messagingSenderId: "851817091463",
  appId: "1:851817091463:web:63b8977e612e3cab3a0322",
  measurementId: "G-2989Y2BNFL",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const getToken = async () => {
  if (!constants.useAuth) {
    return "Bearer DEVUSER";
  } else {
    const token = (await auth.currentUser?.getIdToken()) || "";
    return `Bearer ${token}`;
  }
};

export const getUid = async () => {
  if (!constants.useAuth) {
    return "123456789";
  } else {
    return auth.currentUser?.uid ?? "";
  }
};
