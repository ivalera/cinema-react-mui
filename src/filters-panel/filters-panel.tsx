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
import React, { useState } from "react";
import { FILM_YEARS } from "./data/sort-data";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { INITIAL_SORT, useFilmSortContent, useSort, useSortDispatch } from "./filters-context";
import { GenresType } from "./type";
import { FILTERS_PANEL_MAIN_STYLE, FILTERS_PANEL_STYLES, FILTERS_PANEL_TOP_STYLES } from "./styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function valuetext(value: number) {
    return `${value}`;
  }

export default function FiltersPanel(){

    const dispatch = useSortDispatch() ?? (() => {});
    const sort = useSort() ?? INITIAL_SORT;
    const filmSort = useFilmSortContent() ?? [];
    const [selectedGenres, setSelectedGenres] = useState<GenresType[]>(sort.genres);

    const handleChangeCriteria = (event: SelectChangeEvent<string>) => {
        dispatch({ type: 'CRITERIA', criteria: event.target.value });
    };

    const handleChangeYear = (event: Event, newValue: number | number[]) => {
        dispatch({ type: 'YEAR', year: newValue as number[] });
    };

    const handleGenresChange = (event: React.ChangeEvent<{}>, value: GenresType[]) => {
        const updatedGenres = sort.genres.map(genre => ({
            ...genre,
            checked: value.some(selectedGenre => selectedGenre.id === genre.id)
        }));
        setSelectedGenres(updatedGenres.filter(genre => genre.checked));
        dispatch({ type: 'GENRES', genres: updatedGenres });
    };

    const sortReset = () => {
        dispatch({
            type: 'RESET_SORT',
            initialCriteria: INITIAL_SORT.criteria,
            initialYear: INITIAL_SORT.year,
            initialGenres: INITIAL_SORT.genres,
        });
        setSelectedGenres(INITIAL_SORT.genres); 
    }


    return(
        <Box sx={FILTERS_PANEL_STYLES}>
            <Paper sx={{ width: '100%' }}>
                <Box
                    sx={FILTERS_PANEL_TOP_STYLES}>
                    <Typography variant="h6">Фильтры</Typography>
                    <IconButton onClick={sortReset}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box sx={FILTERS_PANEL_MAIN_STYLE}>
                    <FormControl 
                        fullWidth
                        variant="standard"
                    >
                        <InputLabel id="film-select-label">
                            Сортировать по:
                        </InputLabel>
                        <Select
                            labelId="film-select-label"
                            value={sort.criteria}
                            onChange={handleChangeCriteria}
                            label="Сортировать по"
                        >
                            {filmSort.FILM_CRTITERIAS.map((criteria) => (
                                <MenuItem key={criteria.id} value={criteria.value}>
                                    {criteria.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography 
                        component='p'
                        marginTop='8px'
                    >
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
                        value={selectedGenres}
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
                <Stack sx={{ width: '100%' }}>
                    <Pagination count={10} color="primary" />
                </Stack>
            </Paper>
        </Box>
    )
}