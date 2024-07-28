import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import filmsReducer from './filmsSlice';
import sortReducer from './sortSlice';


const store = configureStore({
    reducer: {
        authorization: authorizationReducer,
        films: filmsReducer,
        sort: sortReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
