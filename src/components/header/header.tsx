// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
// отключил, т.к. по default spread в mui
import React, { useCallback } from 'react';
import {
    AppBar, Box, Toolbar,
} from '@mui/material';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { styled, css } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';

import './header.css';
import { useAppSelector } from 'hooks/use-app-selector';
import { getNewsState } from 'services/redux/selectors/news/news';
import { useDispatch } from 'react-redux';
import { refreshNews } from 'services/redux/slices/news/news';

const ButtonsContainer = styled('div')(
    () => css`
    display: flex;
    width: 100%;
    gap: 24px;
    `,
);

export const Header = () => {
    const dispatch = useDispatch()
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
                                <PopupState variant="popover" popupId="favorite-popup-menu">
                                    {(popupState) => (
                                        <>
                                            <Button variant="contained" color="info" {...bindTrigger(popupState)}>
                                                Favourites
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={() => popupState.close()}>Pro sdf sdf</MenuItem>
                                                <MenuItem onClick={popupState.close}>My account</MenuItem>
                                                <MenuItem onClick={popupState.close}>Logout</MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </PopupState>
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
