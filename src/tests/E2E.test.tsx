import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { App } from '../App';

describe("Стандартный сценарий прохождения опросника", () => {
  it("На последнем вопросе появляется кнопка showResults", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container } = render(app);
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);

    const questionsNumber = 10;

    for(let i = 0; i < questionsNumber - 1; i++) {
      const answerBtn = container.querySelector(".MuiButtonBase-root");
      const nextBtn = await findByRole("button", {name: "Next"});
        //@ts-ignore
      fireEvent.click(answerBtn);
      fireEvent.click(nextBtn);
    }
    const showResultsBtn = await findByRole("button", {name: "Show Results"});
    expect(showResultsBtn).toBeInTheDocument();
  }),
  it("При нажатии на кнопку showResults появляются результаты опросника", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container, findByText } = render(app);
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);

    const questionsNumber = 10;

    for(let i = 0; i < questionsNumber - 1; i++) {
      const answerBtn = container.querySelector(".MuiButtonBase-root");
      const nextBtn = await findByRole("button", {name: "Next"});
      //@ts-ignore
      fireEvent.click(answerBtn);
      fireEvent.click(nextBtn);
    }

    const showResultsBtn = await findByRole("button", {name: "Show Results"});
    const answerBtn = container.querySelector(".MuiButtonBase-root");

    //@ts-ignore
    fireEvent.click(answerBtn);
    fireEvent.click(showResultsBtn);

    const results = await findByText("Congratulations! Here your results:");

    expect(results).toBeInTheDocument;
  })
})