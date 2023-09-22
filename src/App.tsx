import React, {useState, useEffect} from 'react';
import './App.css';
import { QuizCard } from './components/QuizCard';
import { useAppSelector, useAppDispatch } from './redux/store/hooks';
import { decode } from "html-entities";
import { fetchQuiz } from './redux/features/dataSlice';

export function App() {
  const answQData = useAppSelector(state => state.answQData);
  const quizData = useAppSelector(state => state.quizData);
  const dispatch  = useAppDispatch();

  const [showResults, setShowResults] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  // console.log("quizData", quizData.results)

  function isEqualArrays(arr1: string[], arr2: string[]): boolean {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false;
    for (const elem of set2) {
        if (!set1.has(elem)) return false;
    }
    return true;
  }
  
  const score = quizData.results
    .filter((data) => isEqualArrays(data.correct_answer, answQData.answered_questions[data.id]))
    .length;

  const order = ["hard", "medium", "easy"];
  const sortedResults = [...quizData.results].sort((a, b) => {
    return order.indexOf(a.difficulty) - order.indexOf(b.difficulty)
  })

  // if (quizData.loading !== "loaded") {
  //   return <div>Loading...</div>
  // }

  if (showResults) {
    return (
      <div>
        {sortedResults.map((data) => {
          return(
          <div key={data.id} style={{ margin: '15px 0 15px 0' }}>
            <div>Difficulty: {decode(data.difficulty)}</div>
            <div>Correct answer: {data.type === "multiple_choice" 
                                  ? decode(data.correct_answer.join(", ")) 
                                  : decode(data.correct_answer.join())}</div>
            <div>Your answer: {data.type === "multiple_choice" 
                              ? decode(answQData.answered_questions[data.id].join(", ")) 
                              : decode(answQData.answered_questions[data.id].join())}</div>
          </div>)
        })}
        <div>Your score: {score}</div>
      </div>
    );
  };
  if (start) {
    return (
      <div className='App'>
        <QuizCard 
          quizData = {quizData}
          setShowResults = {setShowResults}
        />
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>Let's go!</h1>
      <button onClick={() => setStart(true)}>Start</button>
    </div>
  );
}