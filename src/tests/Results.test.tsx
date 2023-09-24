import { render } from "@testing-library/react";
import { Results } from "../components/Results";

describe("Результат отображается корректно", () => {
  it("Ответы отсортированы в порядке сложности", () => {
    const quizData = {
      response_code: 0,
      loading: "loaded",
      error: "",
      results: [
        {
          id: 1,
          category: "A",
          correct_answer: ["A"],
          difficulty: "easy",
          incorrect_answers: ["B", "C"],
          question: "A",
          type: "multiple",
        },
        {
          id: 2,
          category: "B",
          correct_answer: ["B"],
          difficulty: "hard",
          incorrect_answers: ["A", "C"],
          question: "B",
          type: "multiple",
        },
        {
          id: 3,
          category: "C",
          correct_answer: ["C"],
          difficulty: "medium",
          incorrect_answers: ["A", "B"],
          question: "C",
          type: "multiple",
        },
      ],
    };

    const answQData = {
      answered_questions: {
        1: ["A"],
        2: ["B"],
        3: ["C"],
      },
    };

    const { getAllByTestId } = render(
      <Results quizData={quizData} answQData={answQData} />
    );

    const resultItems = getAllByTestId("result-item");

    expect(resultItems[0].textContent).toContain("B");
    expect(resultItems[1].textContent).toContain("C");
    expect(resultItems[2].textContent).toContain("A");
  }),
	it("Набранные очки считаются правильно", () => {
		const quizData = {
      response_code: 0,
      loading: "loaded",
      error: "",
      results: [
        {
          id: 1,
          category: "A",
          correct_answer: ["A"],
          difficulty: "easy",
          incorrect_answers: ["B", "C"],
          question: "A",
          type: "multiple",
        },
        {
          id: 2,
          category: "B",
          correct_answer: ["B"],
          difficulty: "hard",
          incorrect_answers: ["A", "C"],
          question: "B",
          type: "multiple",
        },
        {
          id: 3,
          category: "C",
          correct_answer: ["C"],
          difficulty: "medium",
          incorrect_answers: ["A", "B"],
          question: "C",
          type: "multiple",
        },
      ],
    };

    const answQData = {
      answered_questions: {
        1: ["A"],
        2: ["B"],
        3: ["C"],
      },
    };

    const { getByText } = render(
      <Results quizData={quizData} answQData={answQData} />
    );

		const score = getByText("Your score: 3");

		expect(score).toBeInTheDocument();
	})
});
