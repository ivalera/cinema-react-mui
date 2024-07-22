import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Icon, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Link } from 'react-router-dom';
import { FilmType } from './type';
import { getChangeFavoriteRequest } from '../api/request-change-favorite';
import { useAuthorization } from '../providers/authorization-context';
import { useFilmsDispatch } from './films-context';
import useSnackbar from './snackbar-alert';

interface FilmCardProps {
    film : FilmType,
    idRoute : number
    filmFavorite: FilmType | null;
}


export default function FilmsCard ({ film, idRoute, filmFavorite } : FilmCardProps) {
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(!!filmFavorite);
    const { accountId } = useAuthorization(); 
    const dispatchFilms = useFilmsDispatch(); 
    const { showSnackbar, SnackbarComponent } = useSnackbar();

    useEffect(() => {
        setIsFavorite(!!filmFavorite);
    }, [filmFavorite]);


    const handleFavoriteClick = async () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);

        try {
            const response = await getChangeFavoriteRequest(accountId, film.id, !newFavoriteStatus); 
            if (response.status >= 200 && response.status < 300) {
                if (dispatchFilms) {
                    dispatchFilms({ type: 'UPDATE_FAVORITE_FILM', filmId: film.id, isFavorite: newFavoriteStatus });
                }
                showSnackbar(newFavoriteStatus ? 'Фильм добавлен в избранное.' : 'Фильм удален из избранного.', 'success');
            } else {
                console.error("Ошибка обновления избранного фильма:", response.status);
                setIsFavorite(!newFavoriteStatus);
                showSnackbar('Ошибка обновления избранного фильма!', 'error');
            }
        } catch (error) {
            console.error("Ошибка обновления избранного фильма:", error);
            setIsFavorite(!newFavoriteStatus);
            showSnackbar('Ошибка обновления избранного фильма!', 'error');
        }
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            )}
            <Link to={`/cinema-react-mui/movies/${idRoute}`}>
                <CardMedia
                    component="img"
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        display: loading ? 'none' : 'block',
                    }}
                    image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title}
                    onLoad={() => setLoading(false)}
                />
            </Link>
            <CardContent sx= {{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column', 
                    }}
                >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {film.title}
                    </Typography>
                    <Typography component="p" color="text.secondary">
                        Рейтинг {film.vote_average.toFixed(1)}
                    </Typography>
                </Box>
                <Icon
                    sx={{ cursor: 'pointer' }} 
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? <StarIcon /> : <StarBorderIcon />} 
                </Icon>
            </CardContent>
            <SnackbarComponent /> 
        </Card>
    );
}