import axios from 'axios';
import { MOVIE_GENRE_API, MOVIE_TOKEN } from './constants';
import { GenresType } from '../filters-panel/type';

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${MOVIE_TOKEN}`
    },
  };

async function getGenresRequest(): Promise<GenresType[]> {
    try {
        const request = await axios.get(MOVIE_GENRE_API, options);
        return request.data.genres;
    } catch (error) {
        console.error(error);
        return [];
    }    
}

export { getGenresRequest };