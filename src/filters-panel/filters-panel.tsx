import React, { useEffect } from "react";
import {
    Autocomplete,
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Slider,
    Typography,
    Checkbox,
    TextField,
    Stack,
    Pagination
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
    setCriteria,
    setYear,
    setGenres,
    resetSort,
    setCurrentPage as setSortCurrentPage,
    fetchGenres,
    fetchSearchedFilms,
    setSearchQuery,
} from "../store/sortSlice";
import {
    fetchFilms,
    setCurrentPage as setFilmCurrentPage,
} from "../store/filmsSlice";
import { FILTERS_PANEL_MAIN_STYLE, FILTERS_PANEL_STYLES, FILTERS_PANEL_TOP_STYLES } from "./styles";
import { FILM_CRITERIAS, FILM_YEARS } from "./data/sort-data";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { GenresType } from "./type";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function valuetext(value: number) {
    return `${value}`;
}

export default function FiltersPanel() {
    const dispatch = useDispatch<AppDispatch>();

    const sort = useSelector((state: RootState) => state.sort);
    const films = useSelector((state: RootState) => state.films);

    useEffect(() => {
        if (!sort.genres.length) {
            dispatch(fetchGenres());
        }
    }, [dispatch, sort.genres.length]);

    const handleChangeCriteria = (event: SelectChangeEvent<string>) => {
        dispatch(setCriteria(event.target.value));
    };

    const handleChangeYear = (event: Event, newValue: number | number[]) => {
        dispatch(setYear(newValue as number[]));
    };

    const handleGenresChange = (event: React.ChangeEvent<{}>, value: GenresType[]) => {
        const updatedGenres = sort.genres.map(genre => ({
            ...genre,
            checked: value.some(selectedGenre => selectedGenre.id === genre.id)
        }));
        dispatch(setGenres(updatedGenres));
    };

    const sortReset = () => {
        dispatch(resetSort());
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (sort.searchQuery.length >= 2) {
            dispatch(setSortCurrentPage(value));
            dispatch(fetchSearchedFilms({ query: sort.searchQuery, page: value })); 
        } else {
            dispatch(setFilmCurrentPage(value));
            dispatch(fetchFilms(sort.criteria));
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query)); 
        if (query.length >= 2) {
            dispatch(fetchSearchedFilms({ query, page: 1 }));
        }
    };

    const totalPage = Number(sort.searchQuery.length >= 2 ? sort.totalPage : films.totalPage) || 1;
    const currentPage = Number(sort.searchQuery.length >= 2 ? sort.currentPage : films.currentPage) || 1;

    return (
        <Box sx={FILTERS_PANEL_STYLES}>
            <Paper sx={{ width: '100%' }}>
                <Box sx={FILTERS_PANEL_TOP_STYLES}>
                    <Typography variant="h6">Фильтры</Typography>
                    <IconButton onClick={sortReset}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={FILTERS_PANEL_MAIN_STYLE}>
                    <TextField
                        fullWidth
                        label="Поиск по фильмам"
                        variant="standard"
                        value={sort.searchQuery}
                        onChange={handleSearchChange}
                        sx={{ marginBottom: 2 }}
                        placeholder="Введите минимум 2 символа"
                    />
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="film-select-label">Сортировать по:</InputLabel>
                        <Select
                            labelId="film-select-label"
                            value={sort.criteria}
                            onChange={handleChangeCriteria}
                            label="Сортировать по"
                        >
                            {FILM_CRITERIAS.map((criteria) => (
                                <MenuItem key={criteria.id} value={criteria.value}>
                                    {criteria.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography component='p' marginTop='8px'>
                        Год релиза:
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Year range'}
                        value={sort.year}
                        onChange={handleChangeYear}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={Number(FILM_YEARS[0].value)}
                        max={Number(FILM_YEARS[FILM_YEARS.length - 1].value)}
                    />
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="autocomplete-sort"
                        options={sort.genres}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        value={sort.genres.filter(genre => genre.checked)}
                        onChange={handleGenresChange}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Жанры"
                            />
                        )}
                    />
                </Box>
                <Stack spacing="1" sx={{ width: '100%' }}>
                    <Pagination
                        count={Math.min(totalPage, 500)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
