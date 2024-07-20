import React, { createContext, useReducer, useContext, useEffect, Dispatch } from 'react';
import { FilmType, InitiaFilmsType } from './type';
import { getFilmsRequest } from '../api/request-films';
import { INITIAL_SORT, useSort } from '../filters-panel/filters-context';
import { getFilmsFavoriteRequest } from '../api/requset-films-favorite';
import { useAuthorization } from '../providers/authorization-context';

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

interface FilmsLoadingAction {
    type: 'SET_LOADING';
    loading: boolean;
}

interface FilmFavoriteAction {
    type: 'FILMS_FAVORITE';
    filmsFavorite: FilmType[];
}

interface UpdateFavoriteFilmAction {
    type: 'UPDATE_FAVORITE_FILM';
    filmId: number;
    isFavorite: boolean;
}

type Action = FilmsAction 
    | FilmsTotalPageAction 
    | FilmsCurrentPageAction 
    | FilmsLoadingAction 
    | FilmFavoriteAction
    | UpdateFavoriteFilmAction;

const INITIAL_FILMS: InitiaFilmsType = {
    films: [],
    totalPage: 1,
    currentPage: 1,
    loading: false,
    filmsFavorite: []
};

const FilmsContext = createContext<InitiaFilmsType>(INITIAL_FILMS);
const FilmsDispatchContext = createContext<Dispatch<Action> | null>(null);

function FilmsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(filmsReducer, INITIAL_FILMS);
    const sort = useSort() ?? INITIAL_SORT;
    const { accountId } = useAuthorization(); 

    useEffect(() => {
        async function fetchFilmsFavorite() {
            try{
                const favoriteFilms = await getFilmsFavoriteRequest(accountId);
                dispatch({ type: 'FILMS_FAVORITE', filmsFavorite: favoriteFilms });
            } catch(error){
                console.error(error);
            }
        }

        fetchFilmsFavorite();
    }, []);


    useEffect(() => {
        let isMounted = true;

        async function fetchFilms() {
            dispatch({ type: 'SET_LOADING', loading: true });
            try {
                const films = await getFilmsRequest(sort.criteria, state.currentPage);
                if (isMounted) {
                    dispatch({ type: 'FILMS', films: films.results });
                    dispatch({ type: 'FILMS_TOTAL_PAGE', totalPage: Math.min(films.total_pages, 500) }); 
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted) {
                    dispatch({ type: 'SET_LOADING', loading: false });
                }
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
        case 'SET_LOADING':
            return { 
                ...state, 
                loading: action.loading 
            };
        case 'FILMS_FAVORITE':
            return {
                ...state,
                filmsFavorite: action.filmsFavorite
            };
        case 'UPDATE_FAVORITE_FILM':
            const updatedFilmsFavorite = action.isFavorite 
                ? [...state.filmsFavorite, state.films.find(film => film.id === action.filmId)!]
                : state.filmsFavorite.filter(film => film.id !== action.filmId);

            return {
                ...state,
                filmsFavorite: updatedFilmsFavorite
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