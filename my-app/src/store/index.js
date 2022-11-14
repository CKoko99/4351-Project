import { createSlice, configureStore } from "@reduxjs/toolkit";

const authInitialState = {
    isLoggedIn: false,
    userName: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userName = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userName = "";
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
