import React from 'react';
import { Box, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import FiltersPanel from '../filters-panel/filters-panel';
import { FiltersProvider } from '../filters-panel/filters-context';
import { FilmsProvider } from '../films/films-context';
import FilmsCardList from '../films/films-card-list';

export default function MainPage(){
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

    const toggleFilterPanel = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen);
    };

    return(
        <>
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
                <FiltersProvider>
                    <FilmsProvider>
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
                    </FilmsProvider>
                </FiltersProvider>
            </Box>
        </>
    )
}