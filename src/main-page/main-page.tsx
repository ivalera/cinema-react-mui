import React from 'react';
import { Box, Container } from '@mui/material'
import { useState } from 'react';
import Header from '../header/header';
import { MAIN_CONTAINER_STYLES } from './styles';
import SignupForm from '../modal-forms/signup-from';
import FiltersPanel from '../filters-panel/filters-panel';
import { FiltersProvider } from '../filters-panel/filters-context';
import { FilmsProvider } from '../films-card/films-context';
import FilmsCardList from '../films-card/films-card-list';

export default function MainPage(){
    const [openSignup, setOpenSignup] = useState(false);

    const onShowSignUp = () => {
        setOpenSignup(true);
    }

    const onCloseSignup = () => {
        setOpenSignup(false);
    };

    return(
        <Container sx={MAIN_CONTAINER_STYLES}>
            <SignupForm openModal={openSignup} onClose={onCloseSignup}/>
            <Header onClick={onShowSignUp}/>
            <Box sx={{ 
                display: 'flex', 
                height: 'calc(100vh - 64px)',
                flexDirection: 'row', 
                gap: 2, 
                width: '100%',
                overflowY: 'auto',
                }}
            >    
                <FiltersProvider>
                    <FilmsProvider>
                        <FiltersPanel/>
                        <FilmsCardList/>
                    </FilmsProvider>
                </FiltersProvider>
            </Box>
        </Container>
    )
}