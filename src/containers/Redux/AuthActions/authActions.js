import * as valueType from '../valueType';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../../../firebase';


export const loadingAuth = () => {
    return {
        type: valueType.AUTHLOADING
    }
}

export const loadedAuth = (authInfo) => {
    return {
        type: valueType.AUTHLOADED,
        payload: authInfo
    }
}

export const authFailed = (error) => {
    return {
        type: valueType.AUTHFAILED,
        payload: error
    }
}


// set token and name in local storage
export const setLocalStorage = (token, name) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('name', JSON.stringify(name));
}


// sign in
export const signIn = (em, password) => async dispatch => {
    dispatch(loadingAuth());
    try {
        const user = await signInWithEmailAndPassword(auth, em, password);
        const { displayName, accessToken } = user.user;

        setLocalStorage(accessToken, displayName);

        dispatch(loadedAuth(accessToken));
    } catch (error) {
        dispatch(authFailed(error))
    }
}

// signup

export const signUp = (em, password, name) => async dispatch => {

    dispatch(loadingAuth());
    try {
        const user = await createUserWithEmailAndPassword(auth, em, password);

        await auth.currentUser.updateProfile({ displayName: name });

        const { displayName, accessToken } = user.user;

        setLocalStorage(accessToken, displayName);

        dispatch(loadedAuth(accessToken));

    } catch (error) {
        dispatch(authFailed(error))
    }

}

// sign in with social media
export const socialMediaAccess = (provider) => async dispatch => {
    try {
        const userInfo = await signInWithPopup(auth, provider);

        const { accessToken, displayName } = userInfo.user;

        setLocalStorage(accessToken, displayName);

        dispatch(loadedAuth(accessToken));

    } catch (err) {
        dispatch(authFailed(err))
    }

}

// Logout function
export const logOut = () => async dispatch => {
    try {
        await signOut(auth);
        localStorage.clear();
    } catch (err) {
        return err;
    }
}


// getting token from localStorage
export const getToken = () => dispatch => {
    const token = localStorage.getItem('token');
    dispatch(loadedAuth(token))
}