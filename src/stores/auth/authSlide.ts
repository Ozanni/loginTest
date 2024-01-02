import { IJwtToken } from './../../types/dto/user';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../features/auth/types";

const initialState: AuthState = {
    token: {
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
        expiresAt: null,
        type: null,
        issuedAt: null,
    }
}

export const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, {payload}: PayloadAction<IJwtToken>) => {
            state.token = payload;
        },
        ['clearToken']: (state) => {
            state.token = null;
        }
    }
})

export const { setToken, clearToken } = authSlide.actions;

export const authReducer = authSlide.reducer;