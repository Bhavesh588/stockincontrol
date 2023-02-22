import React, { useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { auth, facebookAuth, googleAuth, twitterAuth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// prettier-ignore
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    async function signup(email, password, data) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (user) => {
                if (user !== null) {
                    updateProfile(user.user, {
                        displayName: data.fullName
                    })
                    var finalUser = {
                        id: user.user.uid,
                        displayName: data.fullName,
                        email: user.user.email,
                        password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                        emailVerified: user.user.emailVerified,
                        providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                        subscribePlan: "Basic",
                        country: data.country,
                        state: data.state
                    };
                    await axios.post(
                        "http://localhost:5000/register/new",
                        finalUser
                    );
                    await sendEmailVerification(user.user, {
                        url: "http://localhost:3000/",
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then(async (user) => {
            setErr('')
            if(user !== null) {
                if(user.user.emailVerified) {
                    var finalEdit = {
                        id: user.user.uid,
                        displayName: user.user.displayName,
                        email: user.user.email,
                        password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                        emailVerified: user.user.emailVerified,
                        providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                        subscribePlan: "Basic",
                    };
                    await axios.put(
                        "http://localhost:5000/register/edit",
                        finalEdit
                    );
                } else {
                    setErr("Email is not Verified");
                }
            }
        });
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function googleLogin() {
        return signInWithPopup(auth, googleAuth).then(async (user) => {
            if (user !== null) {
                var finalUser = {
                    id: user.user.uid,
                    displayName: user.user.displayName,
                    email: user.user.email,
                    password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                    emailVerified: user.user.emailVerified,
                    providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                    subscribePlan: "Basic",
                };
                await axios.get(`http://localhost:5000/register/${finalUser.id}`).then(async (res) => {
                    if(res.data.length === 0) {
                        await axios.post(
                            "http://localhost:5000/register/new",
                            finalUser
                        );
                    }
                })
            }
        })
    }

    function facebookLogin() {
        return signInWithPopup(auth, facebookAuth);
    }

    function twitterLogin() {
        return signInWithPopup(auth, twitterAuth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setCurrentUser(user);
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
