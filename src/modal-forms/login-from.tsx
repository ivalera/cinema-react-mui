import React, { ChangeEvent, useState } from "react";
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { BUTTON_WRAPPER_STYLE, MODAL_STYLE } from "./styles";
import { INITIAL_AUTHORIZATION, useAuthorization, useAuthorizationDispatch } from "../providers/authorization-context";

interface LoginFormProps {
    onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
    const [token, setToken] = useState('');
    const { isLogin } = useAuthorization() ?? INITIAL_AUTHORIZATION;
    const authorizationDispatch = useAuthorizationDispatch() ?? (() => {});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }

    const handleCancel = () => {
        authorizationDispatch({ type: 'IS_LOGIN', isLogin: false });
        onClose();
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!token){
            return;
        }
        console.log(`Токен есть ${token}`)
        authorizationDispatch({ type: 'SET_USER_TOKEN', userToken: token })
        authorizationDispatch({ type: 'IS_LOGIN', isLogin: false });
        onClose();
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
                <Box
                    sx={BUTTON_WRAPPER_STYLE}>
                    <Button
                        onClick={onClose}
                        variant="text"
                        color="primary"
                    >
                        Отменить
                    </Button>
                    <Button
                        type="submit"
                        variant="text"
                        color="primary"
                    >
                        Ок
                    </Button>
                </Box>
            </Box>
        </Modal>
    </Box>
  );
}