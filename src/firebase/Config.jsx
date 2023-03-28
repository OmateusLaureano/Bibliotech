
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0xrIHpzMLD4G4DNWjDvFoW6zdovRTnCg",
  authDomain: "bibliotech-bd92d.firebaseapp.com",
  projectId: "bibliotech-bd92d",
  storageBucket: "bibliotech-bd92d.appspot.com",
  messagingSenderId: "611568675295",
  appId: "1:611568675295:web:c4e2b0280e4adb18d9fc6a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //Configurando authentication
export const db = getFirestore(app) // Configurando firestore e seus recursos
export const storage = getStorage(app) // Configurando Storage e seus recursos de upload

