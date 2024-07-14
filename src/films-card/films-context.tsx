import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { FilmType, InitiaFilmsType } from './type';
import { getFilmsRequest } from '../api/request-films';
import { INITIAL_SORT, useSort } from '../filters-panel/filters-context';

interface FilmsAction {
    type: 'FILMS';
    films: FilmType[];
}

type Action = FilmsAction;

const INITIAL_FILMS: InitiaFilmsType = {
    films: [],
};

const FilmsContext = createContext<InitiaFilmsType>(INITIAL_FILMS);

function FilmsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(filmsReducer, INITIAL_FILMS);
    const sort = useSort() ?? INITIAL_SORT;
    console.log(sort.criteria);
    useEffect(() => {
        async function fetchPopularFilms() {
            const films = await getFilmsRequest(sort.criteria);
            dispatch({ type: 'FILMS', films: films });
        }
        fetchPopularFilms();
    }, [sort.criteria]);

    return(
        <FilmsContext.Provider value={state}>
                {children}
        </FilmsContext.Provider>

    )
}

function useFilms() {
    return useContext(FilmsContext);
}

function filmsReducer(state: InitiaFilmsType, action: Action) {
    switch(action.type) {
        case 'FILMS':
            return { 
                ...state, 
                films: action.films 
            };
        default:
            return state;
    }
}

export {
    INITIAL_FILMS,
    FilmsProvider,
    useFilms,
}