import React, { ChangeEvent, useState } from "react";
import { BUTTON_WRAPPER_STYLE, MODAL_STYLE } from "./styles";
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { setIsLogin } from "../store/authorizationSlice";

interface SignupFormProps {
    openModal: boolean;
    onClose: () => void;
    onShowLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ openModal, onClose, onShowLogin }) => {
    const [email, setEmail] = useState('');
    const isLogin = useSelector((state: RootState) => state.authorization.isLogin);
    const dispatch = useDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email) return;

        dispatch(setIsLogin(!isLogin));
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
                    <Box sx={BUTTON_WRAPPER_STYLE}>
                        <Button onClick={onClose} variant="text" color="primary">
                            Отменить
                        </Button>
                        <Button type="submit" variant="text" color="primary">
                            Запросить
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default SignupForm;
