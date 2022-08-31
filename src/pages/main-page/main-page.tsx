import React, { useEffect } from 'react';

import { Title } from 'components/title/title';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { fetchNewsData } from 'services/redux/slices/news/news';

export const MainPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchNewsData() as any);
    });
    return <Title type="h1">Main Page</Title>;
};
