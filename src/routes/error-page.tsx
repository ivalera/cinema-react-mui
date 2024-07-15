import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
    return (
        <Box 
            sx={{ 
                height: '100vh',
                display: "flex", 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center', 
                gap: 4 
            }}>
            <Typography variant="h2">Ууупс!</Typography>
            <Typography component="p">Извините, произошла непредвиденная ошибка.</Typography>
            <Typography component="p">
                <Typography component="i">{error?.statusText || error?.message || "Неизвестная ошибка"}</Typography>
            </Typography>
        </Box>
    );
}