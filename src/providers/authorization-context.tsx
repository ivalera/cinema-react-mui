import React, { createContext, useReducer, useContext, useEffect, Dispatch } from 'react';
import Cookies from 'js-cookie';

interface UserAction {
    type: 'SET_USER_TOKEN';
    userToken: string;
}

interface IsLoginAction {
    type: 'IS_LOGIN';
    isLogin: boolean;
}

interface AccountIdAction {
    type: 'SET_ACCOUNT_ID';
    accountId: number;
}

type Action = UserAction | IsLoginAction | AccountIdAction;

type InitiaAuthorizationType = {
    userToken: string;
    isLogin: boolean;
    accountId: number;
}

const INITIAL_AUTHORIZATION: InitiaAuthorizationType = {
    userToken: '',
    isLogin: false,
    accountId: 0
};

const AuthorizationContext = createContext<InitiaAuthorizationType>(INITIAL_AUTHORIZATION);
const AuthorizationDispatchContext = createContext<Dispatch<Action> | null>(null);

function AuthorizationProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authorizationReducer, INITIAL_AUTHORIZATION);

    useEffect(() => {
        const savedUser = Cookies.get('userTokenMovie');
        if (savedUser) {
            dispatch({ type: 'SET_USER_TOKEN', userToken: savedUser });
        }

        const savedAccountId = Cookies.get('accountId');
        if (savedAccountId) {
            dispatch({ type: 'SET_ACCOUNT_ID', accountId: Number(savedAccountId) });
        }
    }, []);

    useEffect(() => {
        if (state.userToken) {
            Cookies.set('userTokenMovie', state.userToken, { expires: 3 });
        }
    }, [state.userToken]);
    
    return(
        <AuthorizationContext.Provider value={state}>
            <AuthorizationDispatchContext.Provider value={dispatch}>
                {children}
            </AuthorizationDispatchContext.Provider>   
        </AuthorizationContext.Provider>

    )
}

function useAuthorization() {
    return useContext(AuthorizationContext);
}

function useAuthorizationDispatch() {
    return useContext(AuthorizationDispatchContext);
}

function authorizationReducer(state: InitiaAuthorizationType, action: Action) {
    switch(action.type) {
        case 'SET_USER_TOKEN':
            return { 
                ...state, 
                userToken: action.userToken
            };
        case 'IS_LOGIN':
            return { 
                ...state, 
                isLogin: action.isLogin
            };
        case 'SET_ACCOUNT_ID':
            return {
                ...state,
                accountId: action.accountId
            };
        default:
            return state;
    }
}

export {
    INITIAL_AUTHORIZATION,
    AuthorizationProvider,
    useAuthorization,
    useAuthorizationDispatch
}