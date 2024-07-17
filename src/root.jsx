import './root.css'
import SignUpForm from './modal-forms/signup-from'
import LoginForm from './modal-forms/login-from';
import Header from './header/header'
import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MAIN_CONTAINER_STYLES } from './main-page/styles';
import { useAuthorization, useAuthorizationDispatch } from './providers/authorization-context';


function Root() {
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const { userToken } = useAuthorization();
    const authorizationDispatch = useAuthorizationDispatch();
    console.log(userToken);

    const onShowSignUp = () => {
        setIsOpenSignup(true);
    }

    const onCloseSignup = () => {
        setIsOpenSignup(false);
    };

    const onShowLogin = () => {
        authorizationDispatch({ type: 'IS_LOGIN', isLogin: true });
    };

    const onCloseLogin = () => {
        authorizationDispatch({ type: 'IS_LOGIN', isLogin: false });
    };

    return (
        <Container sx={MAIN_CONTAINER_STYLES}>
            <SignUpForm 
                openModal={isOpenSignup} 
                onClose={onCloseSignup} 
                onShowLogin={onShowLogin} 
            />
            <LoginForm onClose={onCloseLogin} />
            <Header onClick={onShowSignUp}/>
            {userToken ? (
                <Outlet />
            ) : (
                <Typography 
                    variant="body1" 
                    color="textSecondary" textAlign='center' m='40px'>
                    Необходимо авторизоваться для доступа к контенту.<br/>
                    Нажмите на иконку, в правом верхнем углу, в шапке.<br/>
                    Введите, любой адрес почты, а так же любой токен, любые символы и нажмите Ок. 
                </Typography>
            )}
        </Container>
    )
}

export default Root
