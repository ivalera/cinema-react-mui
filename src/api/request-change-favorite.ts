import axios from 'axios';
import { MOVIE_TOKEN, MOVIE_FAVORITE_URL } from './constants';

async function getChangeFavoriteRequest(idAccount: number, idFilm: number, isFavorite: boolean) {

    const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${MOVIE_TOKEN}`
        
    }
    const data = {
        media_type: 'movie',
        media_id: idFilm,
        favorite: isFavorite
    }

    try {
        const response = await axios.post(`${MOVIE_FAVORITE_URL}/${idAccount}/favorite`, data, { headers });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Ошибка при обновлении избранного:", error);
        throw error;
    }    
}


export { getChangeFavoriteRequest };