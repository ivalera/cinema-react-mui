import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FilmsCard from './films-card';
import { AppDispatch, RootState } from '../store/store';
import { fetchFilms } from '../store/filmsSlice';

export default function FilmsCardList() {
    const dispatch = useDispatch<AppDispatch>();
    const { films, filmsFavorite, loading } = useSelector((state: RootState) => state.films);
    const { searchResults, searchQuery, criteria } = useSelector((state: RootState) => state.sort);

    useEffect(() => {
        dispatch(fetchFilms(criteria));
    }, [dispatch, criteria]);

    const filmsToDisplay = searchQuery.length >= 2 ? searchResults : films || [];

    if (loading) {
        return (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                gap: 2,
                marginRight: 0.5,
            }}>
            {filmsToDisplay.map((film) => {
                const filmFavorite = filmsFavorite.find(favFilm => favFilm.id === film.id) || null;
                return (
                    <Box key={film.id} sx={{ flex: '1 0 296px ' }}>
                        <FilmsCard idRoute={film.id} film={film} filmFavorite={filmFavorite} />
                    </Box>
                );
            })}
        </Box>
    );
}