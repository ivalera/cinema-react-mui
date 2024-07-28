import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiltersPanel from '../filters-panel/filters-panel';
import FilmsCardList from '../films/films-card-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchFavoriteFilms } from '../store/filmsSlice';

export default function MainPage(){
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const accountId = useSelector((state: RootState) => state.authorization.accountId);

    const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen);

    useEffect(() => {
        if (accountId) {
            dispatch(fetchFavoriteFilms(accountId));
        }
    }, [dispatch, accountId]);


    return(
        <Box sx={{ 
                display: 'flex', 
                height: 'calc(100vh - 64px)',
                flexDirection: 'row', 
                gap: 2, 
                width: '100%',
                overflowY: 'auto',
                position: 'relative'
            }}
        >    
            {isFilterPanelOpen && <FiltersPanel />}
            <IconButton 
                    onClick={toggleFilterPanel} 
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: isFilterPanelOpen ? '386px' : '-4px',
                        zIndex: 1,
                        transform: isFilterPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s, left 0.3s',
                        backgroundColor: 'aliceblue',
                        '&:hover': {
                            backgroundColor: 'lightblue',
                        },
                        '@media (min-width: 1441px)': {
                            left: isFilterPanelOpen ? '946px' : '550px',
                        }
                    }}
                >
                <ArrowForwardIosIcon />
            </IconButton>
            <FilmsCardList />
        </Box>
    )
}