import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsAPI } from 'api/news-api';
import { LoadingType } from 'utils/types/loading';
import { Nullable } from 'utils/types/nullable';

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
    urlToImage: string;
    innerId: string;
}

export interface INewsList {
    news: Nullable<INewsItem[]>;
    newsLazy: Nullable<INewsItem[]>;
    step: number;
    maxSteps: number;
}

export interface INewsState extends INewsList, LoadingType {
    error?:string;
}

export const initialNewsState = {
    loading: 'idle',
    news: null,
    newsLazy: null,
    step: 0,
    maxSteps: 2,
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
        setMaxSteps: (state, action) => {
            state.maxSteps = action.payload;
        },
        incrementStep: (state) => {
            state.step += 1;
        },
        addBatchNews: (state, action) => {
            state.newsLazy = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsData.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {
            state.news = action.payload.articles;
            state.newsLazy = action.payload.articles.slice(0, 20);
            state.step += 1;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const {
    clearError,
    setInnerId,
    addBatchNews,
    setMaxSteps,
    incrementStep,
} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
