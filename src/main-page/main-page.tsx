import React from 'react';
import { Box, Container } from '@mui/material'
import { useState } from 'react';
import Header from '../header/header';
import { MAIN_CONTAINER_STYLES } from './styles';
import SignupForm from '../modal-forms/signup-from';
import FiltersPanel from '../filters-panel/filters-panel';
import { FiltersProvider } from '../filters-panel/filters-context';
import FilmsCard from '../films-card/films-card';
import { CARDS_MOCK } from '../films-card/data';

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
                    <FiltersPanel/>
                </FiltersProvider>
                <Box 
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: 'calc(100% - 430px)',
                        p: 1,
                        gap: 1,
                        marginRight: 1,
                    }}> 
                    {CARDS_MOCK.map((card, index) => (
                        <Box key={index} sx={{ flex: '100 2 296px '}}>
                            <FilmsCard card={card} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}