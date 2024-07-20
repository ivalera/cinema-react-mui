import axios from 'axios';
import { MOVIE_TOKEN, MOVIE_USER_ACCOUNT_ID_URL } from './constants';


async function getAccountId() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN}`
        },
    };
    try {
        const request = await axios.get(MOVIE_USER_ACCOUNT_ID_URL , options);
        return request.data.id;
    } catch (error) {
        console.error(error);
        return [];
    }    
}

export { getAccountId };