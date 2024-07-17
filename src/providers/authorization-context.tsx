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

type Action = UserAction | IsLoginAction;

type InitiaAuthorizationType = {
    userToken: string;
    isLogin: boolean;
}

const INITIAL_AUTHORIZATION: InitiaAuthorizationType = {
    userToken: '',
    isLogin: false
};

const AuthorizationContext = createContext<InitiaAuthorizationType>(INITIAL_AUTHORIZATION);
const AuthorizationDispatchContext = createContext<Dispatch<Action> | null>(null);

function AuthorizationProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(filmsReducer, INITIAL_AUTHORIZATION);

    useEffect(() => {
        const savedUser = Cookies.get('userTokenMovie');
        if (savedUser) {
            dispatch({ type: 'SET_USER_TOKEN', userToken: savedUser });
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

function filmsReducer(state: InitiaAuthorizationType, action: Action) {
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