import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
 
     export function SignupEmail(email, password){
         return createUserWithEmailAndPassword(auth, email, password)  
      }
      export function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
      }
      export function logout(){
       return signOut(auth);
      }
      export function useAuth(){
       const [ currentUser, setCurrentUser ] = useState();
      
      
        useEffect(() => {
          
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
        },[]
        )
      
        return currentUser
      }

      
      
    
     
  
   
     
   
    
 
  