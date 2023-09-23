import React, {useState, useEffect} from 'react';
import { QuizCard } from './components/QuizCard';
import { useAppSelector, useAppDispatch } from './redux/store/hooks';
import { decode } from "html-entities";
import { fetchQuiz, State, Question } from './redux/features/dataSlice';
import { Typography, Button, Box, SvgIcon, CircularProgress } from '@mui/material';
import quizDataFromJson from "./quizData.json";

function isEqualArrays(arr1: string[], arr2: string[]): boolean {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  if (set1.size !== set2.size) return false;
  for (const elem of set2) {
      if (!set1.has(elem)) return false;
  }
  return true;
}

function SquareIcon() {
  return (
    <SvgIcon>
      <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"/>
    </SvgIcon>
  );
}

// const crypto = require('crypto');

// Object.defineProperty(globalThis, 'crypto', {
//   value: {
//     //@ts-ignore
//     getRandomValues: arr => crypto.randomBytes(arr.length)
//   }
// });

export function App() {
  const answQData = useAppSelector(state => state.answQData);
  const quizData = useAppSelector(state => state.quizData);
  // const {response_code, results} = quizDataFromJson;
  // const questions: Question[] = results.map((data) => ({...data, id: crypto.randomUUID(), correct_answer: Array.isArray(data.correct_answer) ? data.correct_answer : [data.correct_answer]}))
  // const quizData: State = {response_code, results: questions, loading: "loaded", error: ""};

  const dispatch  = useAppDispatch();

  const [showResults, setShowResults] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  // console.log("quizData", quizData.results)
  
  const score = quizData.results
    .filter((data) => isEqualArrays(data.correct_answer, answQData.answered_questions[data.id]))
    .length;

  const order = ["hard", "medium", "easy"];
  const sortedResults = [...quizData.results].sort((a, b) => {
    return order.indexOf(a.difficulty) - order.indexOf(b.difficulty)
  })

  if (quizData.loading !== "loaded") {
    return <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>
  }

  if (showResults) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        mt={2} 
        flexDirection="column"
        alignItems="center"
      >
        <Typography 
          sx={{fontSize: "30px"}} 
          align='center' 
          mb={1}
        >
          Congratulations! Here your results:
        </Typography>
        <Typography sx={{fontSize: "24px"}} align='center' mb={1}>Your score: {score}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={1}>
          <Typography sx={{fontSize: "16px"}} align='center' mb={1}>Questions difficulty</Typography>
          <Box>
            <Box color="red" flexBasis="33%"> 
              <Typography sx={{fontSize: "14px"}}><SquareIcon /> - hard</Typography></Box>
            <Box color="orange" flexBasis="33%">
              <Typography sx={{fontSize: "14px"}}><SquareIcon /> - medium</Typography>
            </Box>
            <Box color="green" flexBasis="33%">
              <Typography sx={{fontSize: "14px"}}><SquareIcon />  - easy</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {sortedResults.map((data) => {
            return(
              <Box key={data.id} display="flex" mb={2} width="80%">
                <Box
                  style= {{
                    display: "flex",
                    alignItems: "center",
                    border: "3px solid",
                    borderColor:
                      data.difficulty === 'hard' ? 'red' :
                      data.difficulty === 'medium' ? 'yellow' :
                      data.difficulty === 'easy' ? 'green' : 'white',
                    flexBasis: "60%",
                    padding: "10px",
                    marginRight: "10px"
                  }}
                >
                  <Typography sx={{fontSize: "18px"}}>{decode(data.question)}</Typography>
                </Box>
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  style={{border: "3px solid black", padding: "10px"}}
                  flexBasis="40%" 
                  justifyContent="center"
                >
                    <Typography sx={{fontSize: "16px"}}> {`Correct answer: 
                                  ${data.type === "multiple_choice" 
                                  ? decode(data.correct_answer.join(", ")) 
                                  : decode(data.correct_answer.join())}`}
                    </Typography>
                    <Typography sx={{fontSize: "16px"}}> {`Your answer: 
                              ${data.type === "multiple_choice" 
                              ? decode(answQData.answered_questions[data.id].join(", ")) 
                              : decode(answQData.answered_questions[data.id].join())}`}    
                    </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    );
  };
  if (start) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <QuizCard 
          quizData={quizData}
          setShowResults={setShowResults}
        />
      </Box>
    );
  }

  return (
    <Box 
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button 
        variant='text' 
        onClick={() => setStart(true)}
      >
        <Typography variant='h3'>Let's start!</Typography>
      </Button>
    </Box>
  );
}