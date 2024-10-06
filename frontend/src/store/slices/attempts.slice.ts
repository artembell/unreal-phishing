import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttemptsState {
    value: any[];
}

const initialState: AttemptsState = {
    value: [],
};

export const attemptsSlice = createSlice({
    name: 'attempts',
    initialState,
    reducers: {
        setAttempts: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        }
    },
});

export const { setAttempts } = attemptsSlice.actions;

export const attemptsReducer = attemptsSlice.reducer;