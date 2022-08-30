import { combineReducers } from 'redux';
import { mazeBoardReducer } from './slices/maze-board/maze-board';
import { rulesReducer } from './slices/rules/rules';

export const rootReducer = combineReducers({
    rules: rulesReducer,
    mazeBoard: mazeBoardReducer,
});
