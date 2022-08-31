import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsAPI } from 'api/news-api';
import { LoadingType } from 'utils/types/loading';
import { Nullable } from 'utils/types/nullable';

import shortId from 'shortid';

export interface INewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    }
    title: string;
    url: string;
    utlToImage: string;
    innerId: string;
}

export interface INewsList {
    news: Nullable<INewsItem[]>;
}

export interface INewsState extends INewsList, LoadingType {
    error?:string;
}

export const initialNewsState = {
    loading: 'idle',
    news: null,
} as INewsState;

export const fetchNewsData = createAsyncThunk(
    'news/fetchNewsData', async () => await (await newsAPI.getNews()).data as { articles: INewsItem[] },
);

const newsSlice = createSlice({
    name: 'news',
    initialState: initialNewsState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        },
        setInnerId: (state, action) => {
            state.news = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsData.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {
            state.news = action.payload.articles;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { clearError, setInnerId } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
