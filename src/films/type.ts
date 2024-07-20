import { GenresType } from "../filters-panel/type";

type FilmType = {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
}

type InitiaFilmsType = {
    films: FilmType[];
    totalPage: number;
    currentPage: number;
    loading: boolean;
    filmsFavorite: FilmType[];
}

type CountryType = {
    iso_3166_1: string;
    name: string;

}

type FilmDetailType = {
    budget: number;
    genres: GenresType[];
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    title: string;
    vote_average: number;
    production_countries: CountryType[]

}

export { FilmType, InitiaFilmsType, FilmDetailType };