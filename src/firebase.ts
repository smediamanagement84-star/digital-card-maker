import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - uses environment variables if available, falls back to embedded config
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "project-d65202ef-576b-4137-913",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:98238467650:web:2308e3e5c398eab951e7db",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAIda1av-6yqZEmN8oz61a7cQ1YLUwZ1io",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "project-d65202ef-576b-4137-913.firebaseapp.com",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "project-d65202ef-576b-4137-913.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "98238467650",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "ai-studio-0ddec56e-05cf-4b14-83b1-f636e384786d";

console.log('🔥 Firebase: Initializing with project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firestoreDatabaseId);
export const auth = getAuth(app);

// Persist auth across reloads/closes — important for mobile + PWA-style use
setPersistence(auth, browserLocalPersistence).catch(console.error);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const isMobile = () =>
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const loginWithGoogle = async () => {
  // On mobile, popups are unreliable — use redirect by default.
  if (isMobile()) {
    return signInWithRedirect(auth, googleProvider);
  }
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
      return signInWithRedirect(auth, googleProvider);
    }
    throw err;
  }
};

export const handleGoogleRedirect = () => getRedirectResult(auth);
export const logout = () => signOut(auth);
