import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { dataSlice } from "../features/dataSlice";
import { answersSlice } from "../features/answersSlice";

export const store = configureStore({
  reducer: {
    quizData: dataSlice.reducer,
    answQData: answersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
