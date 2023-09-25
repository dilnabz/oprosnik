import { Typography, Box, SvgIcon, Container } from "@mui/material";
import { State } from "../redux/features/dataSlice";
import { AnswersState } from "../redux/features/answersSlice";
import { decode } from "html-entities";

interface ResultsProps {
  quizData: State;
  answeredQuestionsData: AnswersState;
}

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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

function GreenCheckMark() {
  return (
    <SvgIcon>
      <path fill="green" d="M10 18l-5-5 1.41-1.41L10 15.17l7.59-7.59L19 9z" />
    </SvgIcon>
  );
}

export function Results({ quizData, answeredQuestionsData }: ResultsProps) {
  const score = quizData.results.filter((data) =>
    isEqualArrays(data.correct_answer, answeredQuestionsData.answered_questions[data.id])
  ).length;

  const rightAnswersId: number[] = [];

  quizData.results.forEach((data) => {
    if (
      isEqualArrays(data.correct_answer, answeredQuestionsData.answered_questions[data.id])
    ) {
      rightAnswersId.push(data.id);
    }
  });

  const order = ["hard", "medium", "easy"];
  const sortedResults = [...quizData.results].sort((a, b) => {
    return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
  });

  return (
    <Container>
      <Typography sx={{ fontSize: "30px" }} align="center" mb={1}>
        Congratulations! Here your results:
      </Typography>
      <Typography sx={{ fontSize: "24px" }} align="center" mb={1}>
        Your score: {score}
      </Typography>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        mb={1}
      >
        <Typography sx={{ fontSize: "16px" }} align="center" mr="10px">
          Questions difficulty
        </Typography>
        <Box
          color="red"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr="10px"
        >
          <SquareIcon />
          <Typography sx={{ fontSize: "14px" }} ml="5px">
            - hard
          </Typography>
        </Box>
        <Box
          color="orange"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr="10px"
        >
          <SquareIcon />
          <Typography sx={{ fontSize: "14px" }} ml="5px">
            - medium
          </Typography>
        </Box>
        <Box
          color="green"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SquareIcon />
          <Typography sx={{ fontSize: "14px" }} ml="5px">
            - easy
          </Typography>
        </Box>
      </Box>
      <Box>
        {sortedResults.map((data) => {
          return (
            <Box key={data.id} display="flex" mb={2} data-testid="result-item">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "3px solid",
                  borderColor:
                    data.difficulty === "hard"
                      ? "red"
                      : data.difficulty === "medium"
                      ? "orange"
                      : data.difficulty === "easy"
                      ? "green"
                      : "black",
                  flexBasis: "60%",
                  padding: "10px",
                  marginRight: "10px",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  {decode(data.question)}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  border: "3px solid",
                  borderColor: rightAnswersId.includes(data.id)
                    ? "green"
                    : "black",
                  padding: "10px",
                }}
                flexBasis="40%"
                justifyContent="center"
              >
                <Typography sx={{ fontSize: "16px" }}>
                  {`Correct answer: 
                                    ${
                                      data.type === "multiple_choice"
                                        ? decode(data.correct_answer.join(", "))
                                        : decode(data.correct_answer.join())
                                    }`}
                </Typography>
                <Box
                  display="inline-flex"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontSize: "16px" }}>
                      {`Your answer: 
                                ${
                                  data.type === "multiple_choice"
                                    ? decode(
                                        answeredQuestionsData.answered_questions[
                                          data.id
                                        ].join(", ")
                                      )
                                    : decode(
                                        answeredQuestionsData.answered_questions[
                                          data.id
                                        ].join()
                                      )
                                }`}
                    </Typography>
                  </Box>
                  {rightAnswersId.includes(data.id) && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <GreenCheckMark />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
