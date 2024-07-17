import React, { ChangeEvent, useState } from "react";
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { BUTTON_WRAPPER_STYLE, MODAL_STYLE } from "./styles";
import { INITIAL_AUTHORIZATION, useAuthorization, useAuthorizationDispatch } from "../providers/authorization-context";

interface SignupFormProps {
    openModal: boolean;
    onClose: () => void;
    onShowLogin: () => void;
}

export default function SignupForm({openModal, onClose, onShowLogin}: SignupFormProps) {
    const [email, setEmail] = useState('');
    const { isLogin } = useAuthorization() ?? INITIAL_AUTHORIZATION;
    const authorizationDispatch = useAuthorizationDispatch() ?? (() => {});
    console.log(isLogin)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email){
            return;
        }
        authorizationDispatch({ type: 'IS_LOGIN', isLogin: !isLogin})
        onClose();
        onShowLogin();
    };

    return (
        <Box>
            <Modal
                open={openModal}
                onClose={onClose}
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
                        Запросить токен
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        name="email"
                        label="почта"
                        variant="standard"
                        type="email"
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
                            Запросить
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
  );
}