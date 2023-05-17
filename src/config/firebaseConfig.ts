import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const {
  VITE_FIRE_BASE_API_KEY,
  VITE_FIRE_BASE_AUTH_DOMAIN,
  VITE_FIRE_BASE_PROJECT_ID,
  VITE_FIRE_BASE_STORAGE_BUCKET,
  VITE_FIRE_BASE_MESSAGING_SENDER_ID,
  VITE_FIRE_BASE_APP_ID,
  VITE_FIRE_BASE_MEASUREMENT_ID,
} = import.meta.env;

// Initialize Firebase
const firebaseConfig = {
  apiKey: VITE_FIRE_BASE_API_KEY,
  authDomain: VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: VITE_FIRE_BASE_PROJECT_ID,
  storageBucket: VITE_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: VITE_FIRE_BASE_APP_ID,
  measurementId: VITE_FIRE_BASE_MEASUREMENT_ID,
};

// Firebase storage reference
const storage = getStorage(initializeApp(firebaseConfig));
export default storage;
