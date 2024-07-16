import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useLoaderData } from 'react-router-dom';
import React from "react";
import { FilmDetailType } from "./type";

export default function FilmInfo(){
    const film = useLoaderData() as FilmDetailType;
    console.log(film);
    return(
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} p='20px'>
            <Box display="flex" alignItems="center">
                <Link to="/cinema-react-mui" style={{ textDecoration: 'none' }}>
                    <IconButton  sx={{ marginRight: '10px' }}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Link>
            </Box>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Box flex="0 0 300px" sx={{ margin: { xs: 'auto', sm: '0' } }}>  
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    sx={{ width: '300px', height: '402px' }}
                />
            </Box>
            <Box flex="1">
                <Typography variant="h4" sx={{ flexShrink: 0 }}>{film.title} ({new Date(film.release_date).getFullYear()})</Typography>
                <Box mt={2}>
                    <Typography variant="h6">Детали</Typography>
                    <Typography variant="body1">Рейтинг: {film.vote_average.toFixed(1)}</Typography>
                    <Typography variant="body1">Страна: {film.production_countries.map(country => country.name).join(', ')}</Typography>
                    <Typography variant="body1">Время: {film.runtime} мин.</Typography>
                    <Typography variant="body1">Год выпуска: {new Date(film.release_date).getFullYear()}</Typography>
                    <Typography variant="body1">Жанр: {film.genres.map(genre => genre.name).join(', ')}</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
    )
}