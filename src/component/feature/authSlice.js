import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Thunks for asynchronous actions
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                console.log("user", user);
                return user;
            }
        } catch (error) {
            console.log("error", error);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await signOut(auth);
            console.log("User logged out");
            return null; // Returning null to indicate logout
        } catch (error) {
            console.log("error", error);
            throw error; // Handle error if needed
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
            const dbUser = docSnap?.data();
            console.log("dbuser", dbUser);
            return dbUser;
        } catch (error) {
            console.log("error", error);
            alert("User Not Found");
            throw error; // Ensure the error is propagated
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (user) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const saveUserToDb = {
                uid: userCredential.user.uid,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
            };
            await setDoc(doc(db, "users", userCredential.user.uid), saveUserToDb);
            return saveUserToDb;
        } catch (error) {
            console.log("error", error);
            throw error; // Ensure the error is propagated
        }
    }
);

export const monitorAuthState = createAsyncThunk(
    'auth/monitorAuthState',
    async (_, { dispatch }) => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    const dbUser = docSnap?.data();
                    dispatch(setUser(dbUser || null));
                    resolve(dbUser);
                } else {
                    dispatch(setUser(null));
                    resolve(null);
                }
            });
        });
    }
);

// Initial state for authentication
const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("reducer in setuser", action.payload);
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            console.log("action", action.payload);
            state.user = action.payload;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            console.log("action in login", action.payload);
            state.user = action.payload;
        });

        builder.addCase(logout.fulfilled, (state) => {
            console.log("User logged out, resetting user state.");
            state.user = null; // Reset user to null on logout
        });

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            console.log("reducer case in getCurrentUser", action.payload);
            state.user = action.payload;
        });

        builder.addCase(monitorAuthState.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
