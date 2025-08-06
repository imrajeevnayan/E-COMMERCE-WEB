import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa0WVnLu30YJezAwPusr-6q02VcifD3Sg",
  authDomain: "ziaka-b735a.firebaseapp.com",
  projectId: "ziaka-b735a",
  storageBucket: "ziaka-b735a.firebasestorage.app",
  messagingSenderId: "461048044319",
  appId: "1:461048044319:web:ea4d9cce7c43bef68dae2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Set language to device preference

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});
