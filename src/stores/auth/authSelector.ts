import { RootState } from "../redux";
export const selectToken = (state: RootState) => {
    return state.auth.token?.accessToken;
};
