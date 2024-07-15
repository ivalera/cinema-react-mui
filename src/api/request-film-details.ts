import axios from 'axios';
import { MOVIE_URL, MOVIE_TOKEN } from './constants';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${MOVIE_TOKEN}`
    },
  };

async function getFilmDetailsRequest(id: number) {
    try {
        const request = await axios.get(MOVIE_URL + `${id}?language=ru-RU`, options);
        return request.data;
    } catch (error) {
        console.error(error);
        return [];
    }    
}

export { getFilmDetailsRequest };