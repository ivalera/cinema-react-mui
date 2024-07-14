import { Box } from "@mui/material";
import FilmsCard from "./films-card";
import React from "react";
import { INITIAL_FILMS, useFilms } from "./films-context";

export default function FilmsCardList(){

    const filmsContext = useFilms() ?? INITIAL_FILMS;
    return(
        <Box 
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 'calc(100% - 430px)',
                p: 1,
                gap: 1,
                marginRight: 1,
            }}> 
            {filmsContext.films.map((film, index) => (
                <Box key={index} sx={{ flex: '1 0 296px '}}>
                    <FilmsCard film={film} />
                </Box>
            ))}
        </Box>
    )
}