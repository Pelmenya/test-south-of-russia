import React from 'react';
import { Switch as Routes, Route } from 'react-router-dom';

import { MainPage } from 'pages/main-page/main-page';
import { NotFoundPage } from 'pages/not-found-page/not-found';

export const RoutesProvider = () => (
    <Routes>
        <Route path="/" exact>
            <MainPage />
        </Route>
        <Route path="/news/:id">
            <div>Страница Новости</div>
        </Route>
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Routes>
);
