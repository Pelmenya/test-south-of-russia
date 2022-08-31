import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsAPI } from 'api/news-api';
import { LoadingType } from '../../../../utils/types/loading';
import { Nullable } from '../../../../utils/types/nullable';

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
}

export interface INewsList {
    news: Nullable<INewsItem[]>;
}

export interface IDashBoardState extends INewsList, LoadingType {
    error?:string;
}

export const initialNewsState = {
    loading: 'idle',
    news: null,
} as IDashBoardState;

export const fetchNewsData = createAsyncThunk(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/return-await
    'news/fetchNewsData', async () => await (await newsAPI.getNews() || {}).data,
);

const newsSlice = createSlice({
    name: 'news',
    initialState: initialNewsState,
    reducers: {
        clearError: (state, action) => {
            state.error = undefined;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsData.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            state.news = action.payload.articles;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { clearError } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
