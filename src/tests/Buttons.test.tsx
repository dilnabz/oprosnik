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
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);
  
    await waitFor(() => {
      const nextBtn = getByRole("button", {name: "Next"});
      expect(nextBtn).toBeInTheDocument();
    })
  }),
  it("Нельзя перейти на следующий вопрос, не ответив на текущий", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole } = render(app);
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);
    
    const nextBtn = await findByRole("button", {name: "Next"});

    expect(nextBtn).toBeDisabled();
    
  }),
  it("Можно перейти на следующий вопрос, ответив на текущий", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container } = render(app);
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);

    const answerBtn = container.querySelector(".MuiButtonBase-root");
    const nextBtn = await findByRole("button", {name: "Next"});
      //@ts-ignore
    fireEvent.click(answerBtn);
    expect(nextBtn).not.toBeDisabled();
  }),
  it("При нажатии на кнопку Next появляется следующий вопрос", async() => {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    const { findByRole, container, getByText } = render(app);
  
    const startBtn = await findByRole("button", {name: "Let's start!"});
  
    fireEvent.click(startBtn);

    const answerBtn = container.querySelector(".MuiButtonBase-root");
    const nextBtn = await findByRole("button", {name: "Next"});
      //@ts-ignore
    fireEvent.click(answerBtn);
    fireEvent.click(nextBtn);
    expect(getByText("Question 2 / 10")).toBeInTheDocument();
  })
})