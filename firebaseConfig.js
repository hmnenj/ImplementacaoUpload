import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'

// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

const firebaseConfig = {
  apiKey: "AIzaSyD0tIUIJkonLmzbgf3bFKp2pVqplH8gy9s",
  authDomain: "ddmi-da2ad.firebaseapp.com",
  projectId: "ddmi-da2ad",
  storageBucket: "ddmi-da2ad.firebasestorage.app",
  messagingSenderId: "522298689853",
  appId: "1:522298689853:web:d23cf25740ef8611a39d54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');