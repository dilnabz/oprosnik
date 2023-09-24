import axios from "axios";

export interface RawQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface DataState {
  response_code: number;
  results: RawQuestion[];
}

export async function getData() {
  const response = await axios.get<DataState>(
    "https://opentdb.com/api.php?amount=10"
  );
  return response.data;
}
