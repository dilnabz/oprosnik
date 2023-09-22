import React, {useState, useEffect} from "react";
import { useAppDispatch } from "../redux/store/hooks";
import { State } from "../redux/features/dataSlice";
import { setAnswers } from "../redux/features/answersSlice";
import { decode } from "html-entities";


interface QuizCardProps {
    quizData: State;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export function QuizCard({quizData, setShowResults}: QuizCardProps) {
    const dispatch = useAppDispatch();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

    useEffect(() => {
        if (quizData.results.length > 0) {
            const question = quizData.results[questionIndex];
            let answers = [...question.incorrect_answers, ...question.correct_answer].sort(() => Math.random() - 0.5);
            setOptions(answers);
        }
    }, [quizData, questionIndex])

    function handleClickAnswer(e: React.ChangeEvent<HTMLInputElement>): void {
        const target = e.target as HTMLInputElement;
        let newAnswer;
        if (quizData.results[questionIndex].type === "multiple_choice") {
            if (selectedAnswer.includes(target.value)) {
                newAnswer = selectedAnswer.filter(answer => answer !== target.value);
            } else {
                newAnswer = [...selectedAnswer, target.value];
            }
        } else {
            newAnswer = [target.value];
        }

        setSelectedAnswer(newAnswer);
        dispatch(setAnswers({id: quizData.results[questionIndex].id, answer: newAnswer}))
    };

    function handleNextQuestion() {
        if (questionIndex + 1 < quizData.results.length) {
            setQuestionIndex(questionIndex + 1);
            setSelectedAnswer([]);
        };
    };

    return(
        <div>
            <h4>Question {questionIndex+1}</h4>
            <h3>{decode(quizData.results[questionIndex].question)}</h3>
                <form key={questionIndex}>
                    {options.map((data, id) => {
                        return (
                        <div key={id}>
                            <label>
                                <input
                                    type={quizData.results[questionIndex].type === "multiple_choice" 
                                        ? "checkbox" : "radio"}
                                    value={decode(data)}
                                    name="answer"
                                    onChange={handleClickAnswer}
                                    checked = {selectedAnswer.includes(decode(data))}
                                />
                                {decode(data)}
                            </label>
                        </div>
                        )
                    })}
                </form>
                {questionIndex + 1 === quizData.results.length ? 
                    <button onClick={() => setShowResults(true)} disabled={selectedAnswer.length === 0}>Show Results</button> :
                    <button onClick={handleNextQuestion} disabled={selectedAnswer.length === 0}>Next</button>}
        </div>
    )
}