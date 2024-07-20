import { FilmType } from "../films/type";

type GenresType = {
    id: number; 
    name: string;
    checked: boolean;
};

type InitialSortType = {
    criteria: string;
    year: number[];
    genres: GenresType[];
    searchQuery: string;
    searchResults: FilmType[]; 
    totalPage: number;
    currentPage: number;
}

export { GenresType, InitialSortType };