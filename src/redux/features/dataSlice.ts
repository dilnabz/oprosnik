import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, RawQuestion } from "../../quizApi/quizApi";
import quizData from "../../quizData.json";

const getRandomUniqId = (() => {
  const set = new Set();
  function helper() {
    let uniqNumber =  Math.floor(Math.random() * 900) + 100;
    while (set.has(uniqNumber)) {
      uniqNumber =  Math.floor(Math.random() * 900) + 100;
    }
    set.add(uniqNumber);
    return uniqNumber;
  }

  return helper;
})();

export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async () => {
  //Получение данных из API
  // const {response_code, results} = await getData();

  // Проверка работы чекбокс с данными из quizData.json, потому что в апи нет вопросов с несколькими ответами
  const { response_code, results } = await Promise.resolve(quizData);

  const questions = results.map((data) => ({
    ...data,
    id: getRandomUniqId(),
    correct_answer: Array.isArray(data.correct_answer)
      ? data.correct_answer
      : [data.correct_answer],
  }));
  return {
    response_code,
    questions,
  };
});

export interface Question extends Omit<RawQuestion, "correct_answer"> {
  id: number;
  correct_answer: string[];
}

export interface State {
  response_code: number;
  results: Question[];
  loading: string;
  error: string | undefined;
}

const initialState: State = {
  response_code: 0,
  results: [],
  loading: "idle",
  error: "",
};

export const dataSlice = createSlice({
  name: "quizData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuiz.pending, (state) => {
      state.results = [];
      state.loading = "loading";
    });
    builder.addCase(fetchQuiz.fulfilled, (state, { payload }) => {
      state.results = payload.questions;
      state.response_code = payload.response_code;
      state.loading = "loaded";
    });
    builder.addCase(fetchQuiz.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});
