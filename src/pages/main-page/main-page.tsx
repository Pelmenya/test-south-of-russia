import React, { useEffect } from 'react';

import shortId from 'shortid';

import { Title } from 'components/title/title';
import { fetchNewsData, setInnerId } from 'services/redux/slices/news/news';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Unstable_Grid2';

import './main-page.css';
import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { Loader } from 'components/loader/loader';
import { Header } from 'components/header/header';
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
                <Title className="h1" type="h1">Main Page</Title>
                {news ? (
                    <Grid container spacing={2} mt={2}>
                        {news.map((item) => (
                            <Grid key={shortId.generate()} xs={3}>
                                <Item>{item.author}</Item>
                            </Grid>
                        ))}
                    </Grid>
                ) : <Loader />}
            </main>
        </Container>
    );
};
