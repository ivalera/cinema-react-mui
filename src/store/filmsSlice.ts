import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilmsRequest } from '../api/request-films';
import { getFilmsFavoriteRequest } from '../api/requset-films-favorite';
import { InitiaFilmsType } from '../films/type';
import { RootState } from './store';

interface FilmsState extends InitiaFilmsType {}

const INITIAL_FILMS: FilmsState = {
    films: [],
    totalPage: 1,
    currentPage: 1,
    loading: false,
    filmsFavorite: []
};

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    async (criteria: string, { getState }) => {
        const state = getState() as RootState;
        const response = await getFilmsRequest(criteria, state.films.currentPage);
        return response;
    }
);

export const fetchFavoriteFilms = createAsyncThunk(
    'films/fetchFavoriteFilms',
    async (accountId: number) => {
        const response = await getFilmsFavoriteRequest(accountId);
        return response;
    }
);

const filmsSlice = createSlice({
    name: 'films',
    initialState: INITIAL_FILMS,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        updateFavoriteFilm(state, action: PayloadAction<{ filmId: number; isFavorite: boolean }>) {
            const { filmId, isFavorite } = action.payload;
            const film = state.films.find(film => film.id === filmId);
            
            if (film) {
                if (isFavorite) {
                    if (!state.filmsFavorite.some(film => film.id === filmId)) {
                        state.filmsFavorite.push(film);
                    }
                } else {
                    state.filmsFavorite = state.filmsFavorite.filter(film => film.id !== filmId);
                }
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilms.pending, state => {
                state.loading = true;
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.loading = false;
                state.films = action.payload.results;
                state.totalPage = Math.min(action.payload.total_pages, 500);
            })
            .addCase(fetchFilms.rejected, state => {
                state.loading = false;
            })
            .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
                state.filmsFavorite = action.payload;
            });
    }
});



export const { setCurrentPage, updateFavoriteFilm } = filmsSlice.actions;
export default filmsSlice.reducer;
