import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Header({onClick}: HeaderProps){
    return (
        <Box 
            component="section"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height="64px"
            color="white"
            sx={{
                paddingLeft: 4, 
                paddingRight: 4, 
                backgroundColor: 'lightblue' 
                }}
            >
            <Typography variant='h5'>Фильмы</Typography>
            <IconButton onClick={onClick}>
                <AccountCircleIcon color={'primary'} fontSize="large"/>
            </IconButton>
        </Box>
    )
}