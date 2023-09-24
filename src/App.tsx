import React, { useState, useEffect } from "react";
import { QuizCard } from "./components/QuizCard";
import { Results } from "./components/Results";
import { useAppSelector, useAppDispatch } from "./redux/store/hooks";
import { fetchQuiz } from "./redux/features/dataSlice";
import { Typography, Button, Box, CircularProgress } from "@mui/material";

export function App() {
  const answQData = useAppSelector((state) => state.answQData);
  const quizData = useAppSelector((state) => state.quizData);

  const dispatch = useAppDispatch();

  const [showResults, setShowResults] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  if (quizData.loading !== "loaded") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (showResults) {
    return <Results quizData={quizData} answQData={answQData} />;
  }

  if (start) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <QuizCard quizData={quizData} setShowResults={setShowResults} />
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
      <Typography sx={{ fontSize: "24px" }}>
        The quiz consists of 10 questions of different difficulty
      </Typography>
      <Button variant="text" onClick={() => setStart(true)}>
        <Typography variant="h3">Let's start!</Typography>
      </Button>
    </Box>
  );
}
