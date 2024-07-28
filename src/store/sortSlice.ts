import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getGenresRequest } from '../api/request-genres';
import { getSearchedFilms } from '../api/request-search-films';
import { GenresType, InitialSortType } from '../filters-panel/type';
import { FILM_CRITERIAS, FILM_YEARS } from "../filters-panel/data/sort-data";

const INITIAL_SORT: InitialSortType = {
    criteria: 'popular',
    year: [2003, 2010],
    genres: [],
    searchQuery: '',
    searchResults: [],
    totalPage: 1,
    currentPage: 1
};

export const fetchGenres = createAsyncThunk('sort/fetchGenres', async () => {
    const genres = await getGenresRequest();
    return genres.map(genre => ({ ...genre, checked: false }));
});

export const fetchSearchedFilms = createAsyncThunk(
    'sort/fetchSearchedFilms',
    async ({ query, page }: { query: string, page: number }) => {
        const results = await getSearchedFilms(query, page);
        return {
            searchQuery: query,
            searchResults: results.results,
            totalPage: Math.min(results.total_pages, 500),
            currentPage: page
        };
    }
);

const sortSlice = createSlice({
    name: 'sort',
    initialState: { ...INITIAL_SORT, FILM_CRITERIAS, FILM_YEARS },
    reducers: {
        setCriteria(state, action: PayloadAction<string>) {
            state.criteria = action.payload;
        },
        setYear(state, action: PayloadAction<number[]>) {
            state.year = action.payload;
        },
        setGenres(state, action: PayloadAction<GenresType[]>) {
            state.genres = action.payload;
        },
        resetSort(state) {
            state.criteria = INITIAL_SORT.criteria;
            state.year = INITIAL_SORT.year;
            state.genres = INITIAL_SORT.genres;
            state.searchQuery = '';
            state.searchResults = [];
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(fetchSearchedFilms.fulfilled, (state, action) => {
                state.searchQuery = action.payload.searchQuery;
                state.searchResults = action.payload.searchResults;
                state.totalPage = action.payload.totalPage;
                state.currentPage = action.payload.currentPage;
            });
    }
});

export const { setCriteria, setYear, setGenres, resetSort, setCurrentPage, setSearchQuery } = sortSlice.actions;
export default sortSlice.reducer;
