import axios from 'axios';
import { MOVIE_SEARCH_URL, MOVIE_TOKEN } from './constants';

export async function getSearchedFilms(query: string, page: number) {
    const options = {
        method: 'GET',
        headers: {  
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN}`
        },
    };
    try{
        const response = await axios.get(`${MOVIE_SEARCH_URL}?query=${query}&language=ru-RU&page=${page}`, options);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }  
}