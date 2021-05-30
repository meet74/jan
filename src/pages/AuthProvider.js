import React, { createContext, useEffect, useState } from "react";
import { app as firebase } from "../firebase";
import firebases from 'firebase/app'


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)  
          } catch (e) {
            console.log(e);
          }
        },
        dataStore:async (name)=>{
          console.log(name);
          try {
            await firebase.firestore().collection('SuperAdmin').doc('XztUZdeHaJTdxX8kKzHbDZKWsSG3').update({
              admin: firebases.firestore.FieldValue.arrayUnion(name)
            });
          } catch (error) {
              console.log(error);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
            setUser({});
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
