import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA-Chsud4empxGtLUmX8DRFQjf1VRBUUYM",
  authDomain: "dailydiary-70d06.firebaseapp.com",
  databaseURL: "https://dailydiary-70d06-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dailydiary-70d06",
  storageBucket: "dailydiary-70d06.appspot.com",
  messagingSenderId: "451684633355",
  appId: "1:451684633355:web:a9b800837b647bb85a300e"
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

      
      
    
     
  
   
     
   
    
 
  