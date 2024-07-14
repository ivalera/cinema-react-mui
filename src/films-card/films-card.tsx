import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Icon, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function FilmsCard ({ card }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        }}
        image={card.image}
        alt={card.title}
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
                    {card.title}
                </Typography>
                <Typography component="p" color="text.secondary">
                {card.raiting}
                </Typography>
            </Box>
            <Icon>
                    <StarIcon />
                </Icon>
        </CardContent>
    </Card>
  );
};
