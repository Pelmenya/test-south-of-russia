import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { INewsItem } from 'utils/types/news-item';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import './news-item.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const NewsItem = ({
    author,
    title,
    url,
    urlToImage,
    innerId,
    publishedAt,
    description,
}: INewsItem) => {
    console.log(innerId);

    return (
        <Grid xs={3}>
            <Item>
                <img className="news-item__image" src={urlToImage} alt={description} />
                <Typography variant="h6">{title}</Typography>
            </Item>
        </Grid>
    );
};
