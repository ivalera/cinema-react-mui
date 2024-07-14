type FilmType = {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
}

type InitiaFilmsType = {
    films: FilmType[];
}

export { FilmType, InitiaFilmsType };