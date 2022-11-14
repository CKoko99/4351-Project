import { createSlice, configureStore } from "@reduxjs/toolkit";

const authInitialState = {
    isLoggedIn: false,
    userName: "",
    firstName: "",
    lastName: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userName = "";
            state.firstName = "";
            state.lastName = "";
        }
    }
});

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export const authActions = authSlice.actions;
export default store;
