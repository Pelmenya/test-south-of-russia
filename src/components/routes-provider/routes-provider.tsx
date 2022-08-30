import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page/not-found';

export const RoutesProvider = () => (
    <Switch>
        <Route path="/" component={NotFoundPage} />
        <Route path="*" component={NotFoundPage} />
    </Switch>
);
