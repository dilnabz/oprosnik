import React from 'react';
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { App } from './App';
import { answersSlice } from './redux/features/answersSlice';
import { dataSlice } from './redux/features/dataSlice';
import { configureStore } from '@reduxjs/toolkit';

test('renders learn react link', async () => {
  const store = configureStore({
    reducer: {
      quizData: dataSlice.reducer,
      answQData: answersSlice.reducer,
    }
  })
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  const { getByRole } = render(app);

  const startBtn = getByRole("button", {name: "Start"});

  fireEvent.click(startBtn);

  await waitFor(() => {
    const nextBtn = getByRole("button", {name: "Next"});
    expect(nextBtn).toBeInTheDocument();
  }, {timeout: 4000})

});
