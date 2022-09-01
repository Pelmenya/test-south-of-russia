import React, { useCallback } from 'react';
import {
    AppBar, Box, Toolbar,
} from '@mui/material';

import Button from '@mui/material/Button';

import { styled, css } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';

import './header.css';
import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { useDispatch } from 'react-redux';
import { refreshNews } from 'services/redux/slices/news/news';
import { MenuFavoritesNews } from './components/menu-favorites-news/menu-favorites-news';

const ButtonsContainer = styled('div')(
    () => css`
    display: flex;
    width: 100%;
    gap: 24px;
    `,
);

export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { newsFavorites } = useAppSelector(getNewsState);

    const handlerOnCLickRefresh = useCallback(() => {
        dispatch(refreshNews());
        history.push('/');
    }, []);

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <ButtonsContainer>
                            <Link to="/" className="logo-link">News Explorer</Link>
                            {newsFavorites?.length ? (
                                <MenuFavoritesNews />
                            ) : null}
                            <Button variant="contained" color="info" onClick={handlerOnCLickRefresh}>
                                Refresh
                            </Button>
                        </ButtonsContainer>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};
