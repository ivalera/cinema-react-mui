type GenresType = {
    id: number; 
    name: string;
    checked: boolean;
};

type InitialSortType = {
    criteria: string;
    year: number[];
    genres: GenresType[];
}

export { GenresType, InitialSortType };