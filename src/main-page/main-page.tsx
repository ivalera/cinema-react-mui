import React from 'react';
import { Box, Container, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import Header from '../header/header';
import { MAIN_CONTAINER_STYLES } from './styles';
import SignupForm from '../modal-forms/signup-from';
import FiltersPanel from '../filters-panel/filters-panel';
import { FiltersProvider } from '../filters-panel/filters-context';
import { FilmsProvider } from '../films-card/films-context';
import FilmsCardList from '../films-card/films-card-list';

export default function MainPage(){
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

    const onShowSignUp = () => {
        setIsOpenSignup(true);
    }

    const onCloseSignup = () => {
        setIsOpenSignup(false);
    };

    const toggleFilterPanel = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen);
    };

    return(
        <Container sx={MAIN_CONTAINER_STYLES}>
            <SignupForm openModal={isOpenSignup} onClose={onCloseSignup}/>
            <Header onClick={onShowSignUp}/>
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
                                    left: isFilterPanelOpen ? '340px' : '-4px',
                                    zIndex: 1,
                                    transform: isFilterPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s, left 0.3s',
                                    backgroundColor: 'aliceblue',
                                    '&:hover': {
                                        backgroundColor: 'lightblue',
                                    },
                                }}
                            >
                             <ArrowForwardIosIcon />
                        </IconButton>
                    <FilmsCardList />
                    </FilmsProvider>
                </FiltersProvider>
            </Box>
        </Container>
    )
}