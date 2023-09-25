import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { App } from '../App';

describe("Все кнопки работают", () => {
  it('При клике на кнопку старт появляется карточка вопроса', async () => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, getByRole } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);
  
    await waitFor(() => {
      const nextButton = getByRole("button", {name: "Next"});
      expect(nextButton).toBeInTheDocument();
    })
  }),
  it("Нельзя перейти на следующий вопрос, не ответив на текущий", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);
    
    const nextButton = await findByRole("button", {name: "Next"});

    expect(nextButton).toBeDisabled();
    
  }),
  it("Можно перейти на следующий вопрос, ответив на текущий", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);

    const answerButton = container.querySelector(".MuiButtonBase-root");
    const nextButton = await findByRole("button", {name: "Next"});
      //@ts-ignore
    fireEvent.click(answerButton);
    expect(nextButton).not.toBeDisabled();
  }),
  it("При нажатии на кнопку Next появляется следующий вопрос", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container, getByText } = render(app);
  
    const startButton = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startButton);

    const answerButton = container.querySelector(".MuiButtonBase-root");
    const nextButton = await findByRole("button", {name: "Next"});
      //@ts-ignore
    fireEvent.click(answerButton);
    fireEvent.click(nextButton);
    expect(getByText("Question 2 / 10")).toBeInTheDocument();
  })
})