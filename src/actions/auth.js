import { firebase, googleAuthProvider } from '../firebase/firebase';

// [l165]
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

//[L162]
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider); 
    };
};

// [l165]
export const logout = () => ({
    type: 'LOGOUT'
});

//[L164]
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};