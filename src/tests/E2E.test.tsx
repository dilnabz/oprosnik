import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { App } from "../App";

test("Стандартный сценарий прохождения опросника", async () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  const { findByRole, container, findByText } = render(app);

  const startButton = await findByRole("button", { name: "Let's start!" });

  fireEvent.click(startButton);

  const questionsNumber = 10;

  for (let i = 0; i < questionsNumber - 1; i++) {
    const answerButton = container.querySelector(".MuiButtonBase-root");
    const nextButton = await findByRole("button", { name: "Next" });
    //@ts-ignore
    fireEvent.click(answerButton);
    fireEvent.click(nextButton);
  }
  const showResultsButton = await findByRole("button", { name: "Show Results" });
  const answerButton = container.querySelector(".MuiButtonBase-root");

  //@ts-ignore
  fireEvent.click(answerButton);
  fireEvent.click(showResultsButton);

  const results = await findByText("Congratulations! Here your results:");

  expect(results).toBeInTheDocument;
});
