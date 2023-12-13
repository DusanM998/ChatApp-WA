import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBa23B71uACP5duetsWFSpy25yYAy7hVgE",
    authDomain: "whatsappdm-88c4c.firebaseapp.com",
    projectId: "whatsappdm-88c4c",
    storageBucket: "whatsappdm-88c4c.appspot.com",
    messagingSenderId: "521407271628",
    appId: "1:521407271628:web:ca9d81c852db7c0baee869",
    measurementId: "G-TS64VC5LQG",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
