import React, { createContext, useReducer, Dispatch, useContext, useEffect, useState } from 'react';
import { getGenresRequest } from '../api/request-genres';
import { GenresType, InitialSortType } from './type';
import { FilmSelectType, filmSortData } from './data/sort-data';
import { FilmType } from '../films/type';
import { getSearchedFilms } from '../api/request-search-films';

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

interface SearchAction {
    type: 'SEARCH';
    searchQuery: string;
    searchResults: FilmType[];
}
interface TotalPageAction {
    type: 'SET_TOTAL_PAGE_SEARCH';
    totalPage: number;
}

interface CurrentPageAction {
    type: 'SET_CURRENT_PAGE_SEARCH';
    currentPage: number;
}

type SortAction = CriteriaAction 
    | YearAction 
    | GenresAction 
    | ResetSortAction 
    | SearchAction
    | TotalPageAction
    | CurrentPageAction;

const INITIAL_SORT: InitialSortType = {
    criteria: 'popular',
    year: [2003, 2010],   
    genres: [],
    searchQuery: '',
    searchResults: [],
    totalPage: 1,
    currentPage: 1
};

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SortContext = createContext<InitialSortType>(INITIAL_SORT);
const SortDispatchContext = createContext<Dispatch<SortAction> | null>(null);
const FilmSortContext = createContext<FilmSort>(filmSortData);

function FiltersProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(sortReducer, INITIAL_SORT);
    const debouncedSearchQuery = useDebounce(state.searchQuery, 300);

    useEffect(() => {
        async function fetchGenres() {
            const genres = await getGenresRequest();
            const initialGenres = genres.map(genre => ({ ...genre, checked: false }));
            dispatch({ type: 'GENRES', genres: initialGenres });
        }
        fetchGenres();
    }, []);

    useEffect(() => {

        async function fetchSearchedFilms() {
            try {
                const results = await getSearchedFilms(debouncedSearchQuery, state.currentPage);
                dispatch({ type: 'SEARCH', searchQuery: debouncedSearchQuery, searchResults: results.results });
                dispatch({ type: 'SET_TOTAL_PAGE_SEARCH', totalPage: Math.min(results.total_pages, 500) }); 
            } catch (error) {
                console.error('Ошибка поиска фильмов:', error);
            }
        }

        if (debouncedSearchQuery.length >= 2) {
            fetchSearchedFilms();
        } else {
            dispatch({ type: 'SEARCH', searchQuery: '', searchResults: [] });
        }

    }, [debouncedSearchQuery, state.currentPage]);

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
                genres: action.initialGenres
            };
        case 'SEARCH':
            return {
                ...state,
                searchQuery: action.searchQuery,
                searchResults: action.searchResults
            };
        case 'SET_TOTAL_PAGE_SEARCH':
            return {
                ...state,
                totalPage: action.totalPage
            }
        case 'SET_CURRENT_PAGE_SEARCH':
            return {
                ...state,
                currentPage: action.currentPage
            }
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