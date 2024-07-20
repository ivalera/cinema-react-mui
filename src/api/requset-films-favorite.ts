import axios from 'axios';
import { MOVIE_TOKEN, MOVIE_FAVORITE_URL } from './constants';


async function getFilmsFavoriteRequest(id: number) {
   
    const options = {
        method: 'GET',
        headers: {  
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN}`
        },
    };
    try {
        const request = await axios.get(MOVIE_FAVORITE_URL + `${id}`+`/favorite/movies`, options);
        return request.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }    
}

export { getFilmsFavoriteRequest };