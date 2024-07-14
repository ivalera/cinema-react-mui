import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Icon, Box, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function FilmsCard ({ film }) {
    const [loading, setLoading] = useState(true);
  
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            )}
            <CardMedia
                component="img"
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    display: loading ? 'none' : 'block',
                }}
                image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                onLoad={() => setLoading(false)}
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
