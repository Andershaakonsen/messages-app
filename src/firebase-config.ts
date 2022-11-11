import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAowdnuCnZJ49oPHvGVaxBTvqOlLx5pW30",
  authDomain: "messages-app-2ae09.firebaseapp.com",
  projectId: "messages-app-2ae09",
  storageBucket: "messages-app-2ae09.appspot.com",
  messagingSenderId: "1090608342576",
  appId: "1:1090608342576:web:9cebf3dcd8a4c627042ff5",
  measurementId: "G-K84BFL6TWS",
};

//Makes connection
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
