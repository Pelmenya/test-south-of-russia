import { createSlice } from '@reduxjs/toolkit';

export interface IRulesState {
    isOpen: boolean;
    isNeverOpen: boolean;
}

export const initialRulesState = {
    isOpen: true,
    isNeverOpen: false,
} as IRulesState;

const rulesSlice = createSlice({
    name: 'rulesModal',
    initialState: initialRulesState,
    reducers: {
        setOpenRulesModal: (state, action) => {
            state.isOpen = action.payload;
        },
        setNeverOpenRulesModal: (state, action) => {
            state.isNeverOpen = action.payload;
        },
    },
});

export const { setOpenRulesModal, setNeverOpenRulesModal } = rulesSlice.actions;
export const rulesReducer = rulesSlice.reducer;
