import axios from 'axios';
import { MOVIE_POPULAR, MOVIE_TOKEN } from './constants';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${MOVIE_TOKEN}`
    },
  };

async function getFilmsRequest(sortType: string) {
    try {
        const request = await axios.get(MOVIE_POPULAR + `${sortType}?language=ru-RU` + `&page=1`, options);
        return request.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }    
}

export { getFilmsRequest };