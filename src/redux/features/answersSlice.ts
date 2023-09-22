import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswersState {
    answered_questions: Record<string, string[]>;
}

const initialState: AnswersState = {
    answered_questions: {}
}

export const answersSlice = createSlice({
    name: "answersSlice",
    initialState,
    reducers: {
        setAnswers(state, action: PayloadAction<{ id: string, answer: string[] }>) {
            state.answered_questions[action.payload.id] = action.payload.answer;
        }
    }
})

export const { setAnswers} = answersSlice.actions;