// Ref: https://usehooks.com/useAuth/
import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "../firebase";

const getUserObj = (user) => {
  const {
    uid,
    email,
    displayName,
    photoURL,
    emailVerified,
    phoneNumber,
  } = user;
  return {
    uid,
    email,
    name: displayName,
    photoURL,
    emailVerified,
    phoneNumber,
  };
};

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    setUser(null);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => response.user);
  };

  const signup = (name, email, password) => {
    setUser(null);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) =>
        response.user
          .updateProfile({
            displayName: name,
          })
          .then(() => setUser({ ...user, name }))
      );
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const updateName = (name) => {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
      })
      .then(() => setUser({ ...user, name }));
  };

  const token = () => firebase.auth().currentUser.getIdToken();

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser(getUserObj(fbUser));
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    token,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateName,
  };
}
