import React, { ChangeEvent, useState } from "react";
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { BUTTON_WRAPPER_STYLE, MODAL_STYLE } from "./styles";

interface SignupFormProps {
    openModal: boolean;
    onClose: () => void;
}

export default function SignupForm({openModal, onClose}: SignupFormProps){

    const [email, setEmail] = useState('');

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onTokenRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if(!email){
            return;
        }
        console.log('запросить токен,', `Почта ${email}`)
    };

  return (
    <Box>
        <Modal
            open={openModal}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                component="form" 
                onSubmit={onTokenRequest}
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
                    onChange={onChangeEmail}
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