import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { App } from '../App';

describe("Карточка вопроса отображается корректно", () => {
  it('У вопроса есть номер, текст вопроса, варианты ответа', async () => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, getByText } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);
  
    await waitFor(() => {
      const questionNumber = getByText("Question 1 / 10");
      const questionText = getByText("Metal Gear Solid V: The Phantom Pain runs on the Fox Engine.")
      const questionAnswer1 = getByText("True");
      const questionAnswer2 = getByText("False");
      expect(questionNumber).toBeInTheDocument();
      expect(questionText).toBeInTheDocument();
      expect(questionAnswer1).toBeInTheDocument();
      expect(questionAnswer2).toBeInTheDocument();
    })
  }),
  it("Если вариант ответа один используется радиокнопка", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);

    const radioButton = container.querySelector(".MuiRadio-root");
    expect(radioButton).toBeInTheDocument();
  }),
  it("Если вариантов ответа несколько используется чекбокс", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);

    const questionsNumber = 4;

    for(let i = 0; i < questionsNumber; i++) {
      const answerButton = container.querySelector(".MuiButtonBase-root");
      const nextButton = await findByRole("button", {name: "Next"});
        //@ts-ignore
      fireEvent.click(answerButton);
      fireEvent.click(nextButton);
    }

    const checkboxButton = container.querySelector(".MuiCheckbox-root");
    expect(checkboxButton).toBeInTheDocument();
  })
});