import React, { createContext, useReducer, Dispatch, useContext, useEffect, useState } from 'react';
import { getGenresRequest } from '../api/request-genres';
import { GenresType, InitialSortType } from './type';
import { FilmSelectType, filmSortData } from './data/sort-data';

export interface FilmSort {
    FILM_CRTITERIAS: FilmSelectType[];
    FILM_YEARS: FilmSelectType[];
}

interface CriteriaAction {
    type: 'CRITERIA';
    criteria: string;
}

interface YearAction {
    type: 'YEAR';
    year: number[];
}

interface GenresAction {
    type: 'GENRES';
    genres: GenresType[];
}

interface ResetSortAction {
    type: 'RESET_SORT';
    initialCriteria: string;
    initialYear: number[];
    initialGenres: GenresType[]
}

type SortAction = CriteriaAction | YearAction | GenresAction | ResetSortAction;

const INITIAL_SORT: InitialSortType = {
    criteria: 'popular',
    year: [2003, 2010],   
    genres: []
};

const SortContext = createContext<InitialSortType>(INITIAL_SORT);
const SortDispatchContext = createContext<Dispatch<SortAction> | null>(null);
const FilmSortContext = createContext<FilmSort>(filmSortData);

function FiltersProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(sortReducer, INITIAL_SORT);
  
    useEffect(() => {
        async function fetchGenres() {
            const genres = await getGenresRequest();
            const initialGenres = genres.map(genre => ({ ...genre, checked: false }));
            dispatch({ type: 'GENRES', genres: initialGenres });
        }
        fetchGenres();
    }, []);

    return (
        <SortContext.Provider value={state}>
            <SortDispatchContext.Provider value={dispatch}>
                    <FilmSortContext.Provider value={filmSortData}>
                        {children}
                    </FilmSortContext.Provider>
            </SortDispatchContext.Provider>
        </SortContext.Provider>
    );
}

function useSort() {
    return useContext(SortContext);
}

function useSortDispatch() {
    return useContext(SortDispatchContext);
}

function useFilmSortContent() {
    return useContext(FilmSortContext);
}

function sortReducer(state: InitialSortType, action: SortAction) {
    switch(action.type) {
        case 'CRITERIA':
            return { 
                ...state, 
                criteria: action.criteria 
            };
        case 'YEAR':
            return { 
                ...state, 
                year: action.year 
            };
        case 'GENRES':
            return {
                ...state,
                genres: action.genres,
            };
        case 'RESET_SORT':
            return { 
                ...state, 
                criteria: action.initialCriteria, 
                year: action.initialYear,
                genre: action.initialGenres
            };
        default:
            return state;
    }
}

export { 
    INITIAL_SORT, 
    FiltersProvider, 
    useSort, 
    useSortDispatch, 
    useFilmSortContent, 
}