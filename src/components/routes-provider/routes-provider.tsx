import React from 'react';
import { Switch as Routes, Route } from 'react-router-dom';

import { MainPage } from 'pages/main-page/main-page';
import { NotFoundPage } from 'pages/not-found-page/not-found';
import { NewsPage } from 'pages/news-page/news-page';

export const RoutesProvider = () => (
    <Routes>
        <Route path="/" exact>
            <MainPage />
        </Route>
        <Route path="/news/:id">
            <NewsPage />
        </Route>
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Routes>
);
