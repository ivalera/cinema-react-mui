import React, { createContext, useReducer, useContext, useEffect, Dispatch } from 'react';
import { FilmType, InitiaFilmsType } from './type';
import { getFilmsRequest } from '../api/request-films';
import { INITIAL_SORT, useSort } from '../filters-panel/filters-context';

interface FilmsAction {
    type: 'FILMS';
    films: FilmType[];
}

interface FilmsTotalPageAction {
    type: 'FILMS_TOTAL_PAGE';
    totalPage: number;
}

interface FilmsCurrentPageAction {
    type: 'SET_CURRENT_PAGE';
    currentPage: number;
}

type Action = FilmsAction | FilmsTotalPageAction | FilmsCurrentPageAction;

const INITIAL_FILMS: InitiaFilmsType = {
    films: [],
    totalPage: 1,
    currentPage: 1
};

const FilmsContext = createContext<InitiaFilmsType>(INITIAL_FILMS);
const FilmsDispatchContext = createContext<Dispatch<Action> | null>(null);

function FilmsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(filmsReducer, INITIAL_FILMS);
    const sort = useSort() ?? INITIAL_SORT;

    useEffect(() => {
        let isMounted = true;

        async function fetchFilms() {
            try {
                const films = await getFilmsRequest(sort.criteria, state.currentPage);
                if (isMounted) {
                    dispatch({ type: 'FILMS', films: films.results });
                    dispatch({ type: 'FILMS_TOTAL_PAGE', totalPage: films.total_pages }); 
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchFilms();

        return () => {
            isMounted = false;
        };
    }, [sort.criteria, state.currentPage]);

    return(
        <FilmsContext.Provider value={state}>
            <FilmsDispatchContext.Provider value={dispatch}>
                {children}
            </FilmsDispatchContext.Provider>   
        </FilmsContext.Provider>

    )
}

function useFilms() {
    return useContext(FilmsContext);
}

function useFilmsDispatch() {
    return useContext(FilmsDispatchContext);
}

function filmsReducer(state: InitiaFilmsType, action: Action) {
    switch(action.type) {
        case 'FILMS':
            return { 
                ...state, 
                films: action.films 
            };
        case 'FILMS_TOTAL_PAGE':
            return { 
                ...state, 
                totalPage: action.totalPage 
            };
        case 'SET_CURRENT_PAGE':
            return { 
                ...state, 
                currentPage: action.currentPage 
            };
        default:
            return state;
    }
}

export {
    INITIAL_FILMS,
    FilmsProvider,
    useFilms,
    useFilmsDispatch
}