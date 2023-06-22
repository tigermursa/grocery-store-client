import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // ===================================================================================================================================================================+
  // This code is for image uploading  and set userName
  // =================================================================================================================================================================+
  const auth = getAuth(app);
  const createUser = (email, password, username, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        return Promise.all([
          updateProfile(loggedUser, { displayName: username, photoURL }),
          setDoc(doc(db, "users", loggedUser.uid), {
            username,
            email,
            photoURL,
          }),
        ]);
      })
      .then(() => {
        console.log("User profile updated!");
        setLoading(false);
        return result;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  // ===================================================================================================================================================================+
  //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ This code is for image uploading  and set userName ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // =================================================================================================================================================================+
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observing here logOut ( chatGpt theke aro jante hobe )
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (myUsers) => {
      setUser(myUsers);
      //token url and axios using
      if (myUsers) {
        axios
          .post("http://localhost:5000/jwt", { email: myUsers.email })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  const authInfo = {
    createUser,
    signIn,
    signOutUser,
    user,
    loading,
    signInGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
