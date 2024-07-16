import { getFilmDetailsRequest } from "../api/request-film-details";

export async function filmInfoLoader({ params }) {
    const film = await getFilmDetailsRequest(params.movieId);
    return film;
}