import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswersState {
    answered_questions: Record<number, string[]>;
}

const initialState: AnswersState = {
    answered_questions: {}
}

export const answersSlice = createSlice({
    name: "answersSlice",
    initialState,
    reducers: {
        setAnswers(state, action: PayloadAction<{ id: number, answer: string[] }>) {
            state.answered_questions[action.payload.id] = action.payload.answer;
        }
    }
})

export const { setAnswers} = answersSlice.actions;