import axios, { CancelTokenSource } from 'axios';
import { MOVIE_URL, MOVIE_TOKEN } from './constants';

let cancelTokenSource: CancelTokenSource | null = null;

async function getFilmsRequest(sortType: string, page: number) {
    if (cancelTokenSource) {
        cancelTokenSource.cancel('Отмена предыдущего запроса');
    }
    cancelTokenSource = axios.CancelToken.source();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN}`
        },
        cancelToken: cancelTokenSource.token
    };
    try {
        const request = await axios.get(MOVIE_URL + `${sortType}?language=ru-RU` + `&page=${page}`, options);
        return request.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Запрос отменен:', error.message);
        } else {
            console.error(error);
        }
        return [];
    }    
}

export { getFilmsRequest };