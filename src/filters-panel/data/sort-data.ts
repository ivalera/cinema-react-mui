type FilmSelectType = {
  id: number;
  value: string;
  label: string;
};

const FILM_CRTITERIAS: FilmSelectType[] = [
    {id: 1, value: 'popular', label: 'Популярности' },
    {id: 2, value: 'top_rated', label: 'Рейтингу' },
];

const FILM_YEARS: FilmSelectType[] = [
    {id: 0, value: '1998', label: '1998' },
    {id: 1, value: '1999', label: '1999' },
    {id: 2, value: '2000', label: '2000' },
    {id: 3, value: '2001', label: '2001' },
    {id: 4, value: '2002', label: '2002' },
    {id: 5, value: '2003', label: '2003' },
    {id: 6, value: '2004', label: '2004' },
    {id: 7, value: '2005', label: '2005' },
    {id: 8, value: '2006', label: '2006' },
    {id: 9, value: '2007', label: '2007' },
    {id: 10, value: '2008', label: '2008' },
    {id: 11, value: '2019', label: '2009' },
    {id: 12, value: '2010', label: '2010' },
    {id: 13, value: '2011', label: '2011' },
    {id: 14, value: '2012', label: '2012' },
    {id: 15, value: '2013', label: '2013' },
]

const filmSortData = {FILM_CRTITERIAS, FILM_YEARS};

export { FilmSelectType, FILM_CRTITERIAS, FILM_YEARS, filmSortData };