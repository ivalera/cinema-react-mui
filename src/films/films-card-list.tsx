import { Box, CircularProgress } from "@mui/material";
import FilmsCard from "./films-card";
import React from "react";
import { INITIAL_FILMS, useFilms } from "./films-context";

export default function FilmsCardList(){
    const { films, filmsFavorite, loading } = useFilms() ?? INITIAL_FILMS;

    if (loading) {
        return (
            <Box sx={{ width:"100%", display: "flex", alignItems:"center",  justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        );
    }

    return(
        <Box 
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                gap: 2,
                marginRight: 0.5,
            }}> 
            {films.map((film, index) => {
                const filmFavorite = filmsFavorite.find(favFilm => favFilm.id === film.id) || null;
                return (
                    <Box key={index} sx={{ flex: '1 0 296px ' }}>
                        <FilmsCard idRoute={film.id} film={film} filmFavorite={filmFavorite} />
                    </Box>
                );
            })}
        </Box>
    )
}