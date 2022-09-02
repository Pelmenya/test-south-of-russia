import React, { useMemo, useState } from 'react';

import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { Header } from 'components/header/header';
import { Button, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFavoritesNews } from 'hooks/use-favorite-news';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import './news-page.css';
import { Flex } from 'components/flex/flex';
import { formatTime } from 'utils/functions/format-time';

export const NewsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { newsLazy } = useAppSelector(getNewsState);
    const [newsItem] = useState(newsLazy?.find((item) => item.innerId === id));

    const [isFavorite, setIsFavorite] = useState(newsItem?.isFavorite);

    const date = useMemo(() => formatTime(newsItem?.publishedAt), [newsItem?.publishedAt]);

    const { handlerOnCLickFavoriteIcon } = useFavoritesNews(isFavorite, id);

    const handlerIsFavorite = () => {
        handlerOnCLickFavoriteIcon();
        setIsFavorite(!isFavorite);
    };

    if (!newsItem) return null;

    return (
        <Container sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--body-color)',
        }}
        >
            <Header />
            <main>
                <Typography variant="h4" component="h1" className="news-page__title" mt={4} mb={4}>
                    {newsItem.title}
                </Typography>
                <Flex flexDirection="column" gap={40} className="news-page__container">
                    <Flex gap={20} className="news-page__container">
                        <img src={newsItem.urlToImage} alt={newsItem.title} className="news-page__img" />
                        <Flex flexDirection="column" gap={20} className="news-page__right-toolbar">
                            <Typography variant="body1" component="p">{`Дата: ${date}`}</Typography>
                            {isFavorite
                                ? (
                                    <Button variant="text" onClick={handlerIsFavorite}>
                                        <Favorite color="info" />
                                        <Typography ml="8px" variant="body1" component="p">В избранном</Typography>
                                    </Button>
                                )
                                : (
                                    <Button variant="text" onClick={handlerIsFavorite}>
                                        <FavoriteBorder color="disabled" />
                                        <Typography ml="8px" variant="body1" component="p">В избранное</Typography>
                                    </Button>
                                )}
                            <a target="_blank" rel="noreferrer" href={newsItem.url}>
                                <Button variant="text" onClick={handlerIsFavorite}>
                                    Ссылка на статью
                                </Button>
                            </a>

                            <Flex gap={8} className="news-item__rating">
                                <StarBorderIcon color="warning" />
                                <Typography ml="8px" variant="body1" component="p">{newsItem.rating}</Typography>
                            </Flex>

                        </Flex>
                    </Flex>
                    <Typography variant="body1" component="p">{`Автор: ${newsItem.author}`}</Typography>
                    <Typography variant="body1" component="p">
                        {newsItem.description}
                    </Typography>
                </Flex>
            </main>
        </Container>
    );
};
