import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axiosSecure from "../api/axiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);

  //==================== Register Using Email and Password ====================
  const registerWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //==================== Update User's Profile ====================
  const updateUsersProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //==================== Login Using Email and Password ====================
  const loginWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //================== Register/Login using Google ==================
  const signInWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //==================== Getting current logged in user ====================
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email; //once set current user will become null thats why we are trying to get the users email before setting the user
      const loggedUser = { email: userEmail };
      setUser(currentUser);

      if (currentUser) {
        axiosSecure
          .post("/jwt", loggedUser)
          .then((res) => console.log(res.data));
        setLoading(false);
      } else {
        axiosSecure
          .post("/logout", loggedUser)
          .then((res) => console.log(res.data));
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //==================== Logout User ====================
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    auth,
    user,
    loading,
    registerWithEmailAndPassword,
    updateUsersProfile,
    loginWithEmailAndPassword,
    signInWithGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
