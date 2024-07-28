import React, { ChangeEvent, useState } from "react";
import { BUTTON_WRAPPER_STYLE, MODAL_STYLE } from "./styles";
import { Modal, Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { getAccountId } from "../api/request-account-id";
import Cookies from "js-cookie";
import { setAccountId, setIsLogin, setUserToken } from "../store/authorizationSlice";

interface LoginFormProps {
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
    const [token, setToken] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const isLogin = useSelector((state: RootState) => state.authorization.isLogin);
    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    const handleCancel = () => {
        dispatch(setIsLogin(false));
        onClose();
    };

    const getAccountIdRequest = async () => {
        try {
            const accountId = await getAccountId();
            dispatch(setAccountId(accountId));
            Cookies.set('accountId', accountId.toString(), { expires: 3 });
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!token) return;

        await getAccountIdRequest();
        dispatch(setUserToken(token));
        dispatch(setIsLogin(false));
        onClose();
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <Box>
            <Modal
                open={isLogin}
                onClose={handleCancel}
            >
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={MODAL_STYLE}
                >
                    <Typography
                        variant="h6"
                        marginBottom="20px"
                    >
                        Введите токен
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        name="token"
                        label="токен"
                        variant="standard"
                        type="text"
                        onChange={onChange}
                    />
                    <Box sx={BUTTON_WRAPPER_STYLE}>
                        <Button onClick={handleCancel} variant="text" color="primary">
                            Отменить
                        </Button>
                        <Button type="submit" variant="text" color="primary">
                            Ок
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Токен подошел!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginForm;
