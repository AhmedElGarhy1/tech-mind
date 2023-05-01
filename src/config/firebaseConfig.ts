import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCy0BYdDSk2KQQKMOB_vCRCMlKS3TUamN0",
  authDomain: "techmind-assets.firebaseapp.com",
  projectId: "techmind-assets",
  storageBucket: "techmind-assets.appspot.com",
  messagingSenderId: "102373339986",
  appId: "1:102373339986:web:552e1cdf875f0e301a408b",
  measurementId: "G-8R45BQ56TN",
};

// Firebase storage reference
const storage = getStorage(initializeApp(firebaseConfig));
export default storage;
