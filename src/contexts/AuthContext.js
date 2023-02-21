import React, { useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, facebookAuth, googleAuth, twitterAuth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    async function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function googleLogin() {
        return signInWithPopup(auth, googleAuth);
    }

    function facebookLogin() {
        return signInWithPopup(auth, facebookAuth);
    }

    function twitterLogin() {
        return signInWithPopup(auth, twitterAuth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setErr("");
            if (user) {
                if (user.emailVerified) {
                    setCurrentUser(user);
                } else {
                    setErr("Email is not Verified");
                    sendEmailVerification(user, {
                        url: "http://localhost:3000/",
                    });
                    logout();
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        err,
        signup,
        login,
        logout,
        resetPassword,
        googleLogin,
        facebookLogin,
        twitterLogin,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
