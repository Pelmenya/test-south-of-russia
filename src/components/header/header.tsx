// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
// отключил, т.к. по default spread в mui
import React from 'react';
import {
    AppBar, Box, Toolbar, Typography,
} from '@mui/material';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { styled, css } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import './header.css';

const ButtonsContainer = styled('div')(
    () => css`
    display: flex;
    width: 100%;
    gap: 24px;
    `,
);

export const Header = () => (
    <header>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <ButtonsContainer>
                        <Link to="/" className="logo-link">News Explorer</Link>
                        <PopupState variant="popover" popupId="favorite-popup-menu">
                            {(popupState) => (
                                <>
                                    <Button variant="contained" color="info" {...bindTrigger(popupState)}>
                                        Favourites
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={() => popupState.close()}>Profile sdfg sdf sdf</MenuItem>
                                        <MenuItem onClick={popupState.close}>My account</MenuItem>
                                        <MenuItem onClick={popupState.close}>Logout</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </PopupState>
                    </ButtonsContainer>
                </Toolbar>
            </AppBar>
        </Box>
    </header>
);
