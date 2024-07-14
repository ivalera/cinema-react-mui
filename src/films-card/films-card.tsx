import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Icon, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function FilmsCard ({ film }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        }}
        image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        alt={film.title}
      />
        <CardContent sx= {{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column', 
                }}
            >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {film.title}
                </Typography>
                <Typography component="p" color="text.secondary">
                Рейтинг {film.vote_average}
                </Typography>
            </Box>
            <Icon>
                    <StarIcon />
                </Icon>
        </CardContent>
    </Card>
  );
};
