import React, { useEffect } from 'react';

import shortId from 'shortid';

import { Title } from 'components/title/title';
import { fetchNewsData, setInnerId, setMaxSteps } from 'services/redux/slices/news/news';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { Loader } from 'components/loader/loader';
import { Header } from 'components/header/header';
import { Container } from '@mui/material';

import './main-page.css';
import { NewsList } from 'components/news-list/news-list';
import { countOfBatch } from 'utils/constants/constants';

export const MainPage = () => {
    const { news } = useAppSelector(getNewsState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!news) {
            dispatch(fetchNewsData());
        }
    }, [news]);

    useEffect(() => {
        if (news && !news[0].innerId) {
            dispatch(setInnerId(news.map((item) => ({ ...item, innerId: shortId.generate() }))));
            dispatch(setMaxSteps(Math.ceil(news.length / countOfBatch)));
        }
    }, [news]);

    return (
        <Container sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--body-color)',
        }}
        >
            <Header />
            <main>
                <Title className="h1" type="h1">Страница новостей</Title>
                {news ? (
                    <NewsList />
                ) : <Loader />}
            </main>
        </Container>
    );
};
