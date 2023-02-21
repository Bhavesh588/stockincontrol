import React, { useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
