import './root.css'
import SignUpForm from './modal-forms/signup-from'
import Header from './header/header'
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MAIN_CONTAINER_STYLES } from './main-page/styles';


function Root() {
    const [isOpenSignup, setIsOpenSignup] = useState(false);

    const onShowSignUp = () => {
        setIsOpenSignup(true);
    }

    const onCloseSignup = () => {
        setIsOpenSignup(false);
    };

    return (
        <Container sx={MAIN_CONTAINER_STYLES}>
            <SignUpForm openModal={isOpenSignup} onClose={onCloseSignup}/>
                <Header onClick={onShowSignUp}/>
                <Outlet />
        </Container>
    )
}

export default Root
