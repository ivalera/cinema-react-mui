import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthorizationState {
    userToken: string;
    isLogin: boolean;
    accountId: number;
}

const initialState: AuthorizationState = {
    userToken: '',
    isLogin: false,
    accountId: 0,
};

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setUserToken(state, action: PayloadAction<string>) {
            state.userToken = action.payload;
            Cookies.set('userTokenMovie', action.payload, { expires: 3 });
        },
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        },
        setAccountId(state, action: PayloadAction<number>) {
            state.accountId = action.payload;
            Cookies.set('accountId', action.payload.toString(), { expires: 3 });
        },
        loadFromCookies(state) {
            const savedUserToken = Cookies.get('userTokenMovie');
            if (savedUserToken) {
                state.userToken = savedUserToken;
            }
            const savedAccountId = Cookies.get('accountId');
            if (savedAccountId) {
                state.accountId = Number(savedAccountId);
            }
        },
    },
});

export const { setUserToken, setIsLogin, setAccountId, loadFromCookies } = authorizationSlice.actions;
export default authorizationSlice.reducer;
