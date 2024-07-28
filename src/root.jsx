import './root.css';
import SignUpForm from './modal-forms/signup-from';
import LoginForm from './modal-forms/login-from';
import Header from './header/header';
import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MAIN_CONTAINER_STYLES } from './main-page/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, loadFromCookies } from './store/authorizationSlice';

function Root() {
    const [isOpenSignup, setIsOpenSignup] = React.useState(false);
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.authorization);

    useEffect(() => {
        dispatch(loadFromCookies());
    }, [dispatch]);

    const onShowSignUp = () => {
        setIsOpenSignup(true);
    };

    const onCloseSignup = () => {
        setIsOpenSignup(false);
    };

    const onShowLogin = () => {
        dispatch(setIsLogin(true));
    };

    const onCloseLogin = () => {
        dispatch(setIsLogin(false));
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
                    color="textSecondary" 
                    textAlign='center' 
                    m='40px'>
                    Необходимо авторизоваться для доступа к контенту.<br/>
                    Нажмите на иконку, в правом верхнем углу, в шапке.<br/>
                    Введите, любой адрес почты, а так же любой токен, любые символы и нажмите Ок. 
                </Typography>
            )}
        </Container>
    );
}

export default Root;
